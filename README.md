#### 一、项目需求

**系统名称**：地表及地下双向扫描图形图像生成

**python框架：**Django
**开发环境：**pycharm
**数据库：**MySQL

需求：
1、简介干净的ui界面
2、基本的数据匹配可视化（例如：输入地表以上的建筑模型地形数据根据经纬度进行匹配，匹配输出对应经纬度地下的数据可视化结果（管线，土壤测绘数据），检查数据是否匹配）
3、数据和模型只需要随意找几个，主要有个数据匹配的过程即可
4、预留地表地下数据更新接口
5、建模可以粗糙一点

#### 二、项目开发

**v1.0 数据建模**

1. 制作模板、数据库模型搭建
2. 首页页面
3. 经纬度信息展示
4. 房屋信息

**v2.0 数据插入和展示**

1. 地下信息展示
2. 数据详情
3. 模拟信息插入

**v3.0 数据可视化**

1. 经纬度详情可视化
2. 地下数据可视化展示
3. 首页数据可视化显示

**v4.0 账号开发**

1. 账号系统
2. 用户登录退出操作
3. 登录校验

**FINISH！**

#### 三、项目说明



**应用技术：**
    python,django,mysql,html,css,js,bootstrap,ajax,echarts

**项目配置**：

1. 项目目录中包含requirements.txt文件，为项目运行的依赖
      安装方式：在cmd中执行pip install -r requirements.txt
2. 在settings.py中配置连接数据库执行数据迁移:
    python manage.py makemigrtions
    python manage.py migrate
3. mysql -uroot -p
    use 数据库;
    source sql文件路径
4. 启动项目：
    python manage.py runserver

**重要信息记录：**
链接：127.0.0.1:8000/admin
为管理员登录页面
admin账号为超级管理员帐号，可以直接登录后台添加其他账号
**账号：**admin
**密码：**admin



四个文件夹：
1. home:主代码
2. image_generation:主代码
3. static：css，js，image
4. templates：html文件

manage.py：项目启动文件
requirements.txt：项目运行依赖