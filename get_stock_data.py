import tushare as ts
import json

# 设置tushare token (需要用户自行申请)
ts.set_token('9f179d5bb2ef2edf9739f73a6f6bfa1a08e9ee7ebc59d3ea28b684f1')
pro = ts.pro_api()

# 获取A股股票列表
df = pro.stock_basic(exchange='', list_status='L', fields='ts_code,name')

# 处理股票代码前缀
stock_map = {}
for _, row in df.iterrows():
    ts_code = row['ts_code']
    name = row['name']
    
    # 上交所股票(60/688开头)
    if ts_code.startswith('60') or ts_code.startswith('688'):
        prefix = 'sh'
    # 深交所股票(000/002/300开头)
    elif ts_code.startswith('000') or ts_code.startswith('002') or ts_code.startswith('300'):
        prefix = 'sz'
    else:
        continue
        
    code = ts_code.split('.')[0]
    stock_map[f"{prefix}{code}"] = name

# 保存为JS文件
with open('stock_data.js', 'w', encoding='utf-8') as f:
    f.write('const stockNameMap = ')
    json.dump(stock_map, f, ensure_ascii=False, indent=2)
    f.write(';\n')
    f.write('function getStockName(code) { return stockNameMap[code] || "未知股票"; }\n')

print("股票数据已保存到stock_data.js")