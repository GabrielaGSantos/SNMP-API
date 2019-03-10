var exports = module.exports = {}

//var oids = ["1.3.6.1.2.1.1.3.0", "1.3.6.1.2.1.1.1.0", "1.3.6.1.2.1.25.6.3.1.1.11", "1.3.6.1.2.1.25.2.2.0", "1.3.6.1.2.1.25.1.1.0", "1.3.6.1.2.1.25.1.6.0", "1.3.6.1.2.1.6.6.0"];

exports.novaSessao = function novaSessao(ip, comunidade, oid, metodo) {
    var snmp = require("net-snmp")

    var session = snmp.createSession(ip, comunidade, { version: snmp.Version2c })

    var vetor_resposta = []


    if (metodo == 'get') {
        var myPromise = new Promise((resolve, reject) => {
            session.get(oid, (error, varbind) => {
                if (error)
                    resolve(error)

                else {
                    if (snmp.isVarbindError(varbind))
                        resolve(snmp.varbindError(varbind))

                    else {
                        var resposta = new Object()
                        resposta.oid = varbind[0].oid.toString()
                        resposta.texto = varbind[0].value.toString()
                        vetor_resposta.push(resposta)
                        resolve(vetor_resposta)
                    }
                }
            })
        })
    }

    else {
        var myPromise = new Promise((resolve, reject) => {
            var maxRepetitions = 20
            var oids = oid[0]
            var vetor_resposta = []

            session.subtree(oids, maxRepetitions,
                (varbinds) => {
                    for (var i = 0; i < varbinds.length; i++) {
                        if (snmp.isVarbindError(varbinds[i]))
                            resolve(snmp.varbindError(varbinds[i]))
                        else {
                            resposta = new Object()
                            resposta.oid = (varbinds[i].oid)
                            resposta.texto = (varbinds[i].value.toString())
                            vetor_resposta.push(resposta)
                        }

                    }
                },
                (error) => {
                    if (error)
                        resolve(error)
                    else
                        resolve(vetor_resposta)
                }
            )
        })
    }
    return myPromise
}




