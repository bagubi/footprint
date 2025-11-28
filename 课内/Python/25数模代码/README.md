# Supplementary Material for [论文题目]

本支撑材料包含本文研究所需的 **完整 Python 工程**、**数据文件** 及 **运行说明**，用于复现论文中的模拟与实验结果。

---

## 📦 Python 环境信息
- Python 版本: 3.13.5  
- 操作系统: Windows 11 (64-bit)  
- 处理器: AMD64 Family 25 Model 68 Stepping 1, AuthenticAMD  

### 已安装库版本
- NumPy: 2.3.2  
- Pandas: 2.3.2  
- Matplotlib: 3.10.6  
- Plotly: 6.3.0  
- Pillow: 10.4.0  
- openpyxl: 3.1.5  

### 依赖安装方式

#### pip 逐个安装
```bash
pip install numpy==2.3.2 pandas==2.3.2 matplotlib==3.10.6 plotly==6.3.0 pillow==10.4.0 openpyxl==3.1.5
```
---
## ▶️ 项目运行
### 运行方式
直接运行主程序：
```bash
python 主程序入口.py
```
---

## 📁 项目目录结构

mine_flood_model/
├── 主程序入口.py                 # 主程序入口
├── models/
│   ├── __init__.py
│   ├── mine_network.py    # 巷道网络类
│   ├── water_model.py     # 水流模型类
│   └── escape_planner.py  # 逃生规划类
├── utils/
│   ├── __init__.py
│   ├── file_io.py        # 文件读写工具
│   └── geometry.py       # 几何计算工具
├── data/
│   ├── attachment1.xlsx
│   ├── attachment2.xlsx
│   └── attachment3/      # 模板文件
└── results/              # 输出结果

---
## 🧠 模块说明

### 模型模块 (`__models__模型/`)
- `巷道网络类.py`: 实现巷道网络的建模与相关算法
- `水流漫延模型.py`: 模拟水流在巷道中的漫延过程
- `逃生规划类.py`: 实现人员逃生路径规划算法

### 工具模块 (`__utils__工具/`)
- `文件读写工具.py`: 提供数据读取与保存功能
- `几何计算工具.py`: 实现几何相关的计算函数
---

## 📊 数据文件说明

### 输入文件
- `附件1.xlsx` 和 `附件2.xlsx`：两个不同的矿井巷道网络数据
  - `端点` 工作表：记录巷道中各端点的三维坐标 (X,Y,Z)
  - `巷道` 工作表：记录各巷道的两个端点编号

### 输出文件

运行结果将保存在 `__results__输出结果/` 目录中：
figures_attachment1...都由题目提供的附录1得出的图
figures_attachment2...都由题目提供的附录2得出的图


### 对于问题1(单突水点水流漫延):
（figures_attachment1_problem1文件夹 +figures_attachment2_problem1文件夹）
- 问题1-图1-3D网络结构图.html(交互式3D图)
- 问题1-图2-水流时序图.png
- 问题1-图4-逃生路径图.png(虽然问题1不需要，但函数会生成)
- 问题1-图5-时间分布图.png
- 问题1-图6-散点图.png(虽然问题1不需要，但函数会生成)
### 对于问题2(单源逃生路径):
（figures_attachment1_problem2文件夹 +figures_attachment2_problem2文件夹）
- 问题2-图1-3D网络结构图.html
- 问题2-图2-水流时序图.png
- 问题2-图4-逃生路径图.png
- 问题2-图5-时间分布图.png
- 问题2-图6-散点图.png
### 对于问题3(双突水点水流漫延):
（figures_attachment1_problem3文件夹 +figures_attachment2_problem3文件夹）
- 问题3-图1-3D网络结构图.html
- 问题3-图2-水流时序图.png
- 问题3-图3-双突水点对比图.png
- 问题3-图4-逃生路径图.png (虽然问题3不需要，但函数会生成)
- 问题3-图5-时间分布图.png
- 问题3-图6-散点图.png(虽然问题3不需要，但函数会生成)
### 对于问题4(双源逃生路径):
（figures_attachment1_problem4文件夹 +figures_attachment2_problem4文件夹）
- 问题4-图1-3D网络结构图.html
- 问题4-图2-水流时序图.png
- 问题4-图3-双突水点对比图.png
- 问题4-图4-逃生路径图.png
- 问题4-图5-时间分布图.png
- 问题4-图6-散点图.png
### 输出的Excel结果
- result1-1.xlsx和result1-2.xlsx：单点突水的水流模拟结果
- result2-1.xlsx和result2-2.xlsx：单点突水后的逃生路径
- result3-1.xlsx和result3-2.xlsx：双点突水的水流模拟结果
- result4-1.xlsx和result4-2.xlsx：双点突水后的逃生路径
---
## 📞 联系方式

- 微信号：HAN1975307686
- QQ邮箱：<EMAIL>1975307686@qq.com<EMAIL>
- github：https://github.com/bagubi/footprint/tree/main/%E8%AF%BE%E5%86%85%2FPython%2FD