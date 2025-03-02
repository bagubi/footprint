<?php
// 多行注释快捷键 Shift+Alt+A
//单行注释快捷键 Ctrl+/

echo 'Hello world!'; //输出字符串
echo 'Hi,PHP';
//<br>换行，echo 输出
$a = 10;
//''单引号只会输出字符本身，而""双引号会输出变量的值
echo 'The a value is $a';
echo '<br>';
echo "The a value is $a";
echo '<br>';
//在定义/引用变量的时候需要加$符号
$n7 = .987;
echo $n7;

$arr1 = array(1, 2, 3, 4, 5, 6, 7, 8, 9); //直接为数组赋值，相当于键是数组下标
$arr2 = array("animal" => "dog", "color" => "red"); //为数组指定键名和键值echo 
$arr1[2]; //输出:3
echo '<br>';
echo $arr2["color"]; //输出:red
echo "<br>";
class Animal
{
    public $name; //动物名称
    public function run()
    { //方法:会跑
        echo "Haha.I can run!";
    }
}


//从右往左看，new一个新的Animal对象，赋给左边的变量dog
$dog = new Animal();
$dog->run(); //输出:Haha.I can run!

//空值
$a; //没有被赋值的变量
$b = null; //被赋空值的变量
$c = 3;
unset($c); //使用函数unset()处理后，$c的值为空// var_dump()的作用是输出变量所有的信息

var_dump($a);
var_dump($b);
var_dump($c);
