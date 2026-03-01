import numpy as np 
X = np.array([1, 2, 3, 4, 5])
Y = np.array([2, 3, 5, 7, 11])

n = len(X)

mean_x = sum(X) / n
mean_y = sum(Y) / n

num = 0
den = 0

for i in range(n):
    num += (X[i] - mean_x) * (Y[i] - mean_y)
    den += (X[i] - mean_x) ** 2

m = num / den
c = mean_y - m * mean_x

print("Slope (m):", m)
print("Intercept (c):", c)


