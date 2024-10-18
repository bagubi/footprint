
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct node
{
    int data;
    struct node *next;
} node, *listnode;

listnode creative(int n)
{
    listnode head;
    head = (node *)malloc(sizeof(struct node));
    head->next = NULL;
    node *p, *rear;
    p = rear = head;
    for (int i = 0; i < n; i++)
    {
        p = (node *)malloc(sizeof(struct node));
        scanf("%d", &p->data);

        rear->next = p;
        rear = p;
    }
    rear->next = NULL;
    return head;
}

listnode marge(listnode s1, listnode s2)
{
    if (s1 == NULL)
    {
        return s2;
    }
    else if (s2 == NULL)
    {
        return s1;
    }
    else
    {
        if (s1->data < s2->data)
        {
            s1->next = marge(s1->next, s2);
            return s1;
        }
        else
        {
            s2->next = marge(s2->next, s1);
            return s2;
        }
    }
}

void print(node *l1)
{
    l1 = l1->next;
    while (l1->next != NULL)
    {
        l1 = l1->next;
        printf("%d ", l1->data);
    }
    printf("\n");
}

int main()
{
    int n, m;

    scanf("%d", &n);

    listnode s1;

    s1 = (node *)malloc(sizeof(struct node));

    s1 = creative(n);

    scanf("%d", &m);

    listnode s2;

    s2 = (node *)malloc(sizeof(struct node));

    s2 = creative(m);

    listnode l1 = NULL;
    l1 = marge(s1, s2);

    print(l1);
}