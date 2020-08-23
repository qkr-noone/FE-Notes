""" 题目 https://www.bilibili.com/video/BV1aT4y1J7na?from=search&seid=15992988471669380574 7:30 前后  """
""" LeetCode#518 零钱兑换II """
""" 借助 leetcode 运行环境打印 """
""" https://leetcode-cn.com/problems/peaks-and-valleys-lcci/ """
coins = [1,2,5]
target = 11

def coin_que(coins,target):
    dp=[0 for i in range(target + 1)]
    print(dp)
    for i in range(1, target+1):
        mid = []
        for j in range(len(coins)):
            if i-coins[j] >=0:
                mid.append(dp[i-coins[j]])
        dp[i]=min(mid)+1
    print(dp)
    return dp[-1]
print(coin_que(coins,target))