
function enviarFormulario() {

    var form = document.getElementById('formulario')

    var ip = form.ip.value;
    var comunidade = form.comunidade.value;
    var oid = form.oid.value;
    var metodos = form.metodos.value;

    var URL = `http://localhost:8008/dados-formulario?ip=${ip}&comunidade=${comunidade}&oid=${oid}&metodos=${metodos}`

    fetch(URL)
        .then(data => data.text())
        .then(text => mostrarResposta(text))
        .catch(erro => mostrarResposta(erro))

    return false
}

function mostrarResposta(data) {
    console.log(data)
    var respostas = JSON.parse(data)

    document.getElementById("myTable").innerHTML = "";

    var table = document.getElementById('myTable')

    respostas.forEach(resposta => {
        var row = document.createElement("tr")

        var cell = document.createElement("td")
        var cellText = document.createTextNode(resposta.oid)
        cell.appendChild(cellText)
        row.appendChild(cell)

        var cell = document.createElement("td")
        var cellText = document.createTextNode(resposta.texto)
        cell.appendChild(cellText)
        row.appendChild(cell)

        table.appendChild(row)
    })
}
