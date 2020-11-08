<?php
echo "1 task<br>";

$a = 25;
$b = 43;

if ($a >= 0 && $b >= 0) {
    $res = $a - $b;
    echo $res;
} elseif ($a < 0 && $b < 0) {
    echo $a * $b;
} elseif (($a >= 0 && $b < 0) || ($a < 0 && $b >= 0)) {
    echo $a + $b;
} 
?>

<br>

<?php
echo "2 task<br>";

$a = 0;

switch ($a) {
    case 0:
		echo "0 , "; 
    case 1:
		echo "1 , ";
    case 2:
		echo "2 , ";
    case 3:
		echo "3 , ";
    case 4:
		echo "4 , ";
    case 5:
		echo "5 , ";
    case 6:
		echo "6 , ";
    case 7:
		echo "7 , ";
    case 8:
		echo "8 , ";
    case 9:
		echo "9 , ";
    case 10:
		echo "10 , ";
    case 11:
		echo "11 , ";
    case 12:
		echo "12 , ";
    case 13:
		echo "13 , ";
    case 14:
		echo "14 , ";
    case 15:
		echo "15 . ";
}
?>

<br>

<?php
echo "3 task<br>";

function sum($a, $b) {
    return $a+$b;
}
function raz($a, $b) {
    return $a-$b;
}
function pro($a, $b) {
    return $a*$b;
}
function cha($a, $b) {
    if($b==0){
        return "на 0 делить нельзя";
    }
    return $a/$b;
}

echo sum(2,3)." , ";
echo raz(7,6)." , ";
echo pro(2,2)." , ";
echo cha(10,4)." .";
?>

<br>

<?php
echo "4 task<br>";

echo math(7, 3, '+');

function math($arg1, $arg2, $operation) {
	switch ($operation) {
		case '+':
			return sum($arg1,$arg2);
			break;
		case '-':
			return raz($arg1,$arg2);
			break;
		case '*':
			return pro($arg1,$arg2);
			break;
		case '/':
			return $arg1 / $arg2;
			break;
		default:
			echo "Введены не верные аргументы.";
			break;
	}
}
?>