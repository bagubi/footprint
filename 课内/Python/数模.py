# Python示例（statsmodels）
import pandas as pd
import statsmodels.formula.api as smf

df = pd.DataFrame({
    'X': [1,2,3,4,5,6,7,8,9,10],
    'Y': [3.3,6.5,9.5,12.3,14.9,17.3,19.5,21.5,23.3,24.9]
})
df['X_sq'] = df['X']**2

model = smf.ols('Y ~ X + X_sq', data=df).fit()
print(model.summary())
#  1. 数据处理
# 数据清洗（Pandas）
import pandas as pd
data = pd.read_csv("data.csv")
data.dropna()  # 去空值
# 统计分析（SciPy / StatsModels）
from scipy import stats
stats.linregress(x, y)  # 线性回归
# 2. 预测模型（Python + Mathematica 互补）
# 灰色预测
def grey_prediction(data):
    n = len(data)
    cum_data = np.cumsum(data)
    # ...（具体代码可去GitHub找现成的）
    return prediction
# 时间序列（ARIMA - Python）
from statsmodels.tsa.arima.model import ARIMA
model = ARIMA(data, order=(1,1,1)).fit()
# 3. 评价模型（Mathematica 辅助推导）
# 层次分析法（AHP）

# Python计算权重（numpy）

# Mathematica 做一致性检验（比Python更直观）

# mathematica
# ConsistencyCheck[matrix]  (* 判断矩阵是否合理 *)
# TOPSIS法（Python实现）
def topsis(data, weights):
    normalized = data / np.linalg.norm(data, axis=0)
    weighted = normalized * weights
    # ...计算正负理想解
    return scores

# Python：数据处理、模型计算

# Mathematica：公式推导、复杂可视化

# Word/LaTeX：排版
