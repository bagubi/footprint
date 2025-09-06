def plot_time_statistics(arrival_times, full_times):
    # 水流到达时间分布直方图
    plt.figure(figsize=(12, 5))
    
    plt.subplot(1, 2, 1)
    times = list(arrival_times.values())
    plt.hist([t for t in times if t < float('inf')], bins=20, alpha=0.7)
    plt.xlabel('水流到达时间（分钟）')
    plt.ylabel('节点数量')
    plt.title('节点水流到达时间分布')
    
    plt.subplot(1, 2, 2)
    fill_times = list(full_times.values())
    plt.hist([t for t in fill_times if t < float('inf')], bins=20, alpha=0.7, color='orange')
    plt.xlabel('巷道充满时间（分钟）')
    plt.ylabel('巷道数量')
    plt.title('巷道充满时间分布')
    
    plt.tight_layout()
    plt.show()