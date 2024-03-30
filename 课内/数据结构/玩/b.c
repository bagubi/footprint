#include <stdio.h>
#include <string.h>
#define MAX_SIZE 1000 // 限制长度
char decode(char ch)
{
    if (ch < 'A' || ch > 'Z')
    {
        return ch;
    }
    return ((ch - 'A' - 5 + 26) % 26) + 'A';
}
int main()
{
    char ciphertext[MAX_SIZE];
    if (scanf("%[^\n]", ciphertext) != 1)
    {

        printf("NULL\n");
        return 0;
    }

    int c;
    while ((c = getchar()) != '\n' && c != EOF)
        ;

    for (int i = 0; ciphertext[i] != '\0'; i++)
    {
        putchar(decode(ciphertext[i]));
    }
    putchar('\n');
    return 0;
}