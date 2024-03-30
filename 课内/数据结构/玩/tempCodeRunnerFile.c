
    int c;
    while ((c = getchar()) != '\n' && c != EOF)
        ;

    for (int i = 0; ciphertext[i] != '\0'; i++)
    {
        putchar(decode(ciphertext[i]));
    }
    putchar('\n');
    return 0;