import pandas as pd
import os

def load_attachment(filepath):
    """加载附件数据，返回端点和巷道 DataFrame"""
    try:
        # 读取Excel文件，跳过第一行（标题行）
        endpoints_df = pd.read_excel(filepath, sheet_name='端点', skiprows=1)
        
        # 检查列数是否正确
        if len(endpoints_df.columns) < 4:
            raise ValueError("端点表列数不足")
        
        # 重命名列
        columns = ['端点编号', 'x (m)', 'y (m)', 'z (m)']
        endpoints_df.columns = columns
        
        # 验证必需列
        required_columns = ['端点编号', 'x (m)', 'y (m)', 'z (m)']
        for col in required_columns:
            if col not in endpoints_df.columns:
                raise ValueError(f"端点表缺少必需列: {col}")
        
        # 读取巷道数据
        tunnels_df = pd.read_excel(filepath, sheet_name='巷道')
        
        # 重命名巷道表的列
        tunnel_columns = ['巷道编号', '巷道端点1', '巷道端点2']
        tunnels_df.columns = tunnel_columns
        
        return endpoints_df, tunnels_df
        
    except Exception as e:
        print(f"读取文件失败: {e}")
        raise

def save_result(df, output_path):
    """保存结果到Excel"""
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    df.to_excel(output_path, index=False)
    print(f"结果已保存至: {output_path}")