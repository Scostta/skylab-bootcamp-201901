function Calculate(){
    var num1 = parseInt(document.getElementById("num1").value);
    var num2 = parseInt(document.getElementById("num2").value);
    var suma = num1 + num2;
    var resta = num1 - num2;
    var div = num1 / num2;
    div = div.toFixed(3);
    var mult = num1 * num2;
    document.getElementById("resultado").innerHTML = '<li>' + num1 + ' + ' + num2 + ' = ' + suma + '</li>' + '<li>' + num1 + ' - ' + num2 + ' = ' + resta + '</li>' + '<li>' + num1 + ' * ' + num2 + ' = ' + mult + '</li>'+ '<li>' + num1 + ' / ' + num2 + ' = ' + div + '</li>';
}