# 从 https://github.com/sxxyrry/23XRVirusSampleDatabase/tree/main/Virus 这里获取所有文件，直接下载下来（下载到 ./Virus/ 目录下）

import os
import requests
import urllib3

# 禁用SSL警告
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

def download_files_from_github_folder():
    # 使用GitHub API获取文件列表
    api_url = "https://api.github.com/repos/sxxyrry/23XRVirusSampleDatabase/contents/Virus"
    
    # 创建目标目录
    target_dir = "./Virus/"
    os.makedirs(target_dir, exist_ok=True)
    
    # 获取文件列表
    response = requests.get(api_url, verify=False)
    if response.status_code != 200:
        print(f"无法访问API: {api_url}")
        return
    
    files = response.json()
    
    # 遍历并下载每个文件
    for file_info in files:
        if file_info['type'] == 'file':
            file_name = file_info['name']
            download_url = file_info['download_url']
            
            # 下载文件
            file_response = requests.get(download_url, verify=False)
            if file_response.status_code == 200:
                file_path = os.path.join(target_dir, file_name)
                with open(file_path, 'wb') as f:
                    f.write(file_response.content)
                print(f"已下载: {file_name}")
            else:
                print(f"下载失败: {file_name}")

if __name__ == "__main__":
    download_files_from_github_folder()
