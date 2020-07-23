const axios = require('axios')

const api = axios.create({
    baseURL: 'https://developer.oxforddictionaries.com/api_docs/proxy',
    timeout: 5000,
    headers: 'CENSORED'})

function enToRu(word) {
    return translate(word, 'en', 'ru')
}

function ruToEn(word) {
    return translate(word, 'ru', 'en')
}

async function translate(word, langFrom, langTo) {
    return getData(
        await api.get('', {
            headers: {
                'X-Apidocs-Path': `/api/v2/translations/${langFrom}/${langTo}/${encodeURIComponent(word.toLowerCase())}`
            }
        })
    )
}

function getData(res) {
    let parsed = []
    for (let result of res.data.results) {
        for (let lexicalEntry of result.lexicalEntries) {
            parsed.push(
                {
                    lexicalCategory: lexicalEntry.lexicalCategory.text,
                    translations: lexicalEntry.entries[0].senses
                        .reduce((a, c) => {
                            if (c.translations) a.push(c.translations)
                            return a
                        }, [])
                        .reduce((a, c) => {
                            return [...a, ...c]
                        }, [])
                        .reduce((a, c) => {
                            a.push(c.text)
                            return a
                        }, []),
                    examples: lexicalEntry.entries[0].senses
                        .reduce((a, c) => {
                            if (c.examples) a.push(c.examples)
                            return a
                        }, [])
                        .reduce((a, c) => {
                            return [...a, ...c]
                        }, [])
                        .map(t => ({
                            text: t.text,
                            translation: t.translations[0].text
                        }))
                }
            )
        }
    }
    return parsed
}

module.exports = {translate, enToRu, ruToEn}
