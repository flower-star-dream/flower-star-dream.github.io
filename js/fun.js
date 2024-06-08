var ctx = [];
var fun = [];
var names = ['阈值型', '饱和型', '双曲正切', 'S型', '高斯', 'ReLU'];
var func = [];
// 计算函数的 y 值
func[0] = function(x) {
    if (x < 0) {
        return 0;
    } else {
        return 1;
    }
}
func[1] = function(x, k = 1) {
    if (x < -1 / k) {
        return -1;
    } else if (-1 / k <= x < 1 / k) {
        return k * x;
    } else {
        return 1;
    }
}
func[2] = function(x) {
    return (Math.exp(x) - Math.exp(-x)) / (Math.exp(x) + Math.exp(-x));
}
func[3] = function(x, beta = 1) {
    return 1 / (1 + Math.exp(1 - beta * x));
}
func[4] = function(x, delta = 1) {
    return Math.exp(-x ^ 2 / (delta ^ 2));
}
func[5] = function(x) {
    if (x < 0) {
        return 0;
    } else {
        return x;
    }
}
for (var i = 0; document.getElementById('fun' + (i + 1)); i++) {
    ctx[i] = document.getElementById('fun' + (i + 1)).getContext('2d');
    fun[i] = new Chart(ctx[i], {
        type: 'line',
        data: {
            labels: [], // x 轴标签
            datasets: [{
                label: names[i] + '函数',
                data: [], // 这里将填充函数值
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    type: 'linear', // x 轴为线性
                    position: 'bottom' // x 轴在底部
                }],
                yAxes: [{
                    type: 'linear', // y 轴为线性
                    position: 'left' // y 轴在左侧
                }]
            },
            responsive: true, // 图表响应式布局
            maintainAspectRatio: false // 不保持原始宽高比
        }
    });
    // 填充数据
    for (var j = -10; j <= 10; j += 1) {
        fun[i].data.labels.push(j);
        fun[i].data.datasets[0].data.push(func[i](j));
    }
    // 更新图表
    fun[i].update();
}