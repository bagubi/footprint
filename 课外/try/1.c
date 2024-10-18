#include <stdio.h>

void swap(int *a, int *b)
{
    int temp = *a;
    *a = *b;
    *b = temp;
}

void Bubble_Sort(int a[], int N)
{
    for (int i = 0; i < 3 && i < N - 1; i++)
    { // 只进行前三趟排序
        for (int j = 0; j < N - i - 1; j++)
        {
            if (a[j] > a[j + 1])
            {
                swap(&a[j], &a[j + 1]);
            }
        }
        // 输出当前趟的排序结果
        for (int k = 0; k < N; k++)
        {
            printf("%d ", a[k]);
        }
        // 如果不是第三趟排序，则输出换行符
        if (i < 2)
        {
            printf("\n");
        }
    }
}

int main()
{
    int N;
    scanf("%d", &N);
    int arr[105]; // 使用一个固定大小的数组，因为N不会超过100

    for (int i = 0; i < N; i++)
    {
        scanf("%d", &arr[i]);
    }

    Bubble_Sort(arr, N);
    return 0;
}
