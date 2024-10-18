#include <stdio.h>
#include <stdlib.h>
#include <math.h>
char *month[] = {"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nev", "Dec"};
char *week[] = {"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"};
int j_leapyear(int year) // 定义函数检测输入年份是否为闰年
{
    if ((/*year%400==0*/ year % 4 == 0 && year % 100 != 0) || (year % 400 == 0))
        return (1);
    // else if(year%4==0&&year%100!=0)
    // return (1);
    else
        return 0;
}
int month_day(int year, int month) // 检测该年月份有多少天
{
    int mon_day[] = {31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
    if (j_leapyear(year) && month == 2)
        return 29;
    else
        return (mon_day[month - 1]);
}
int j_week(int year, int month, int day) // 检测该天是星期几
{
    int d = 0, i; // d表示该天在该年份的累计天数
    int w;
    /* int month_day[]={31,28,31,30,31,30,31,31,30,31,30,31};
    if(j_leapyear(year)==1)
    month_day[1]=29;
    for(i=0;i<month;i++)
    d+=month_day[i];
    d=d+day;*/
    for (i = 1; i < month; i++)
        d += month_day(year, i);
    d += day;
    w = (year - 1) + (int)(year - 1) / 4 - (int)(year - 1) / 100 + (int)(year - 1) / 400 + d; // 网上公式
    return ((int)w % 7);
}
int allyear(int year) // 输出全年日历
{
    int i, j, b;
    printf("\n%d 日历", year);
    for (i = 1; i <= 12; i++)
    {
        printf("\n\n\t%s\n", month[i - 1]);
        // printf(" 7 1 2 3 4 5 6 \n");
        printf(" S M T W T F S \n");
        b = j_week(year, i, 1);
        for (j = 1; j <= month_day(year, i) + b; j++)
        {
            if (j <= b)
                printf(" ");
            else if (j - b < 10)
                printf("%2d ", j - b);
            else
                printf("%2d ", j - b);
            // else printf("%2d ",j-b);
            if (j % 7 == 0)
                putchar('\n');
        }
        putchar('\n');
    }
    return 0;
}
void month_print(int year, int month) // 输入一个年月，输出这个月的日历
{
    int i, c, d;
    c = month_day(year, month);
    printf("\n\n %d年%d月日历\n", year, month);
    printf(" S M T W T F S \n");
    d = j_week(year, month, 1);
    for (i = 1; i <= c + d; i++)
    {
        if (i <= d)
            printf(" ");
        else
            printf("%2d ", i - d);
        if (i % 7 == 0)
            putchar('\n');
    }
    putchar('\n');
}
int jisuan_day(int year, int month, int day, int x, int y, int z) // 输入年月日，输出距x年y月z日有多少天,星期几，以及是否是公历节日
{
    int i, a, b, c = 0, d = 0, days = 0, m = 0, n = 0, t;
    a = year >= x ? year : x;
    b = year < x ? year : x;
    if (a > b)
    {
        for (i = b + 1; i < a; i++)
            c += j_leapyear(i);
    }
    else
        c = 0;
    if (year != x)
        d = a - b - 1;
    else
        d = 0;
    m = 365 * d + c;
    if (year < x)
    {
        for (i = month; i <= 12; i++)
            n += month_day(year, i);
        days = m + n + z - day;
    }
    else if (year > x)
    {
        for (i = y; i <= 12; i++)
            n += month_day(x, i);
        for (i = 1; i < month; i++)
            n += month_day(year, i);
        days = m + n + day - z;
    }
    else
    {
        for (i = month >= y ? y : month; i < (month >= y ? month : y); i++)
            n += month_day(x, i);
        days = abs(day - z) + n; // 输出距离y月z日有多少天
    }
    printf("这天离%d年%d月%d号有%d天\n", x, y, z, days);
    t = j_week(year, month, day);
    if (t == 0) // 输出星期几
        printf("这天星期日");
    else if (t == 1)
        printf("这天星期一");
    else if (t == 2)
        printf("这天星期二");
    else if (t == 3)
        printf("这天星期三");
    else if (t == 4)
        printf("这天星期四");
    else if (t == 5)
        printf("这天星期五");
    else if (t == 6)
        printf("这天星期六");
    putchar('\n');
    if (month == 1 && day == 1)
        printf("这天是元旦节");
    else if (month == 2 && day == 14)
        printf("这天是情人节");
    else if (month == 3 && day == 8)
        printf("这天是妇女节");
    else if (month == 3 && day == 12)
        printf("这天是植树节");
    else if (month == 4 && day == 1)
        printf("这天是愚人节");
    else if (month == 4 && day == 4)
        printf("这天是清明节");
    else if (month == 5 && day == 1)
        printf("这天是劳动节");
    else if (month == 6 && day == 1)
        printf("这天是儿童节");
    else if (month == 8 && day == 1)
        printf("这天是建军节");
    else if (month == 9 && day == 10)
        printf("这天是教师节");
    else if (month == 10 && day == 1)
        printf("这天是国庆节");
    else if (month == 12 && day == 25)
        printf("这天是圣诞节");
    else
        printf("这天不是特殊节日");
    putchar('\n');
    return days;
}
void fish_or_net(int year, int month, int day) // 判断是打鱼还是晒网
{
    int q;
    int i, a, b, c = 0, d = 0, days = 0, m = 0, n = 0;
    a = year >= 1990 ? year : 1990;
    b = year < 1990 ? year : 1990;
    if (a > b)
    {
        for (i = b + 1; i < a; i++)
            c += j_leapyear(i);
    }
    else
        c = 0;
    if (year != 1990)
        d = a - b - 1;
    else
        d = 0;
    m = 365 * d + c;
    if (year < 1990)
    {
        for (i = month; i <= 12; i++)
            n += month_day(year, i);
        days = m + n + 1 - day;
    }
    else if (year > 1990)
    {
        for (i = 1; i <= 12; i++)
            n += month_day(1990, i);
        for (i = 1; i < month; i++)
            n += month_day(year, i);
        days = m + n + day - 1;
    }
    else
    {
        for (i = month >= 1 ? 1 : month; i < (month >= 1 ? month : 1); i++)
            n += month_day(1990, i);
        days = abs(day - 1) + n; // 先确定这天离1990年1月1日有多少天
    }
    q = days % 5 + 1;
    if (q == 1 || q == 2 || q == 3) // 判断打鱼还是晒网
        printf("渔人今天打鱼");
    else
        printf("渔人今天晒网");
    putchar('\n');
}
/*int main() //这部分内容用来校检
{
int j_leapyear(int year);
int month_day(int year,int month);
int j_week(int year,int month,int day);
int allyear(int year);
void month_print(int year,int month);
int jisuan_day(int year,int month,int day,int x,int y,int z);
void fish_or_net(int year,int month,int day);
int x,y,z,year,month,day;
// allyear(2015);
//month_print(2016,12);
printf("请输入今天的日期（按年，月，日输入，如2016,1,14表示2016年1月14日）：");
scanf("%d,%d,%d",&x,&y,&z);
printf("\n请随便输入一个日期，格式同上：");
scanf("%d,%d,%d",&year,&month,&day);
jisuan_day(year,month,day,x,y,z);
// fish_or_net(x,y,z);
return 0;
} // 这部分内容是用来检测上述函数是否出错的
*/
int main()
{
    int j_leapyear(int year);
    int month_day(int year, int month);
    int j_week(int year, int month, int day);
    int allyear(int year);
    void month_print(int year, int month);
    int jisuan_day(int year, int month, int day, int x, int y, int z);
    void fish_or_net(int year, int month, int day); // 函数声明
    int option, year, month, day, x, y, z;
    char ny;
    system("color 1f");
    while (1)
    {
        printf("\n\n\t 欢迎来到由...编写的程序\n\n");
        printf(" 请选择您需要的服务，输入编号回车结束\n");
        printf(" 1.输入一个年份，输出该年的日历\n");
        printf(" 2.输入年月，输出这个月的日历。\n");
        printf(" 3.输入年月日，输出据今天还有多久，星期几，是否是公历节日。\n");
        printf(" 4.某人自1990年1月1日开始打鱼，“三天打鱼，两天晒网”，输入一个1990年以后的日期，输出他这一天是打鱼还是晒网。\n");
        printf(" 5.退出\n");
        scanf("%d", &option);
        switch (option) // switch分支结构
        {
        case 1:
            while (1) // while循环，后面的1是常数，表示一直到break才结束循环
            {
                printf("请输入一个年份：");
                scanf("%d", &year);
                allyear(year);
                printf("你想继续查询日历么？（y表示继续，n表示结束）");
                scanf("%c", &ny);
                if (ny == 'n')
                    break;
            }
            break;
        case 2:
            while (1)
            {
                printf("输入年月：");
                scanf("%d,%d", &year, &month);
                month_print(year, month);
                printf("你想继续查询日历么？（y表示继续，n表示结束）：");
                scanf("%c", &ny);
                if (ny == 'n')
                    break;
            }
            break;
        case 3:
            while (1)
            {
                printf("输入年月日：");
                scanf("%d,%d,%d", &year, &month, &day);
                printf("请输入今天的日期：");
                scanf("%d,%d,%d", &x, &y, &z);
                jisuan_day(year, month, day, x, y, z);
                printf("你想继续查询么？（y表示继续，n表示结束）：");
                scanf("%c", &ny);
                if (ny == 'n')
                    break;
            }
            break;
        case 4:
            while (1)
            {
                printf("输入1990年1月1日以后的一个日期：");
                scanf("%d,%d,%d", &year, &month, &day);
                fish_or_net(year, month, day);
                printf("你想继续查询渔人是打鱼还是晒网么？（y表示继续，n表示结束）：");
                scanf("%c", &ny);
                if (ny == 'n')
                    break;
            }
            break;
        case 5:
            while (1)
            {
                printf("确认么？y表示是的，n表示不是");
                scanf("%c", &ny);
                if (ny == 'y')
                    exit(1); // 表示退出程序
                else if (ny == 'n')
                    break;
            }
            break;
        default:
            printf("对不起，暂时没有这个服务");
            break;
        }
    }
    return 0;
}