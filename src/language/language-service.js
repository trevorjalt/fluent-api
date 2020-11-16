const { LinkedList }  = require('./linked-list')

const LanguageService = {
    getUsersLanguage(db, user_id) {
        return db
            .from('language')
            .select(
                'language.id',
                'language.name',
                'language.user_id',
                'language.head',
                'language.total_score',
            )
            .where('language.user_id', user_id)
            .first()
    },

    getLanguageWords(db, language_id) {
        return db
            .from('word')
            .select(
                'id',
                'language_id',
                'original',
                'translation',
                'next',
                'memory_value',
                'correct_count',
                'incorrect_count',
            )
            .where({ language_id })
    },

    getListHead(db, language_id) {
        return db
            .from('word')
            .select(
                'word.id',
                'word.language_id',
                'word.original',
                'word.translation',
                'word.next',
                'word.memory_value',
                'word.correct_count',
                'word.incorrect_count',
                'language.total_score',
                'language.head',
            )
            .leftJoin('language', 'language.head', 'word.id')
            .where('language.id', language_id)
            .first()
    },

    populateLinkedList(language, words) {
        const linkedList = new LinkedList();
        linkedList.id = language.id;
        linkedList.name = language.name;
        linkedList.total_score = language.total_score;
        let word = words.find(w => w.id === language.head)
        linkedList.insertFirst({
            id: word.id,
            original: word.original,
            translation: word.translation,
            memory_value: word.memory_value,
            correct_count: word.correct_count,
            incorrect_count: word.incorrect_count,
        })
        while (word.next) {
            word = words.find(w => w.id === word.next)
            linkedList.insertLast({
                id: word.id,
                original: word.original,
                translation: word.translation,
                memory_value: word.memory_value,
                correct_count: word.correct_count,
                incorrect_count: word.incorrect_count,
            })
        }
        
        return linkedList
    },

    persistLinkedList(db, list) {
        const wordsArr = list.listNodes()
        
        return db.transaction(async (trx) => {
            await Promise.all([
                await trx('language')
                    .where({ id: list.id })
                    .update({
                        total_score: list.total_score,
                        head: list.head.value.id
                    }),

                ...wordsArr.map(word => {
                    return trx('word')
                        .where('id', word.value.id)
                        .update({
                            memory_value: word.value.memory_value > list.length() ? list.length() : word.value.memory_value,
                            correct_count: word.value.correct_count,
                            incorrect_count: word.value.incorrect_count,
                            next: word.next ? word.next.value.id : null,
                        })
                })
            ])
        })
    }
}

module.exports = LanguageService
