export interface VirusFile {
  id: number;
  name: string;
  description: string;
  fileType: string;
  fileSize: string;
  downloadPath: string;
}

export const getVirusFiles = async (): Promise<VirusFile[]> => {
  const fileList = [
    '123.exe',
    '概念之刃1.0.0.1Beta版 SRT.exe',
    '破坏病毒.exe',
    'MEMZ.e',
    'new.bat',
    'sys.exe',
    'White catalpa destruction病毒(无特效).exe',
    'why？？？？？.exe',
    'window.exe',
    'WinGod.e',
    'WinGod.ec',
  ];
  
  // 动态生成病毒数据
  return fileList.map((fileName, index) => {
    const parts = fileName.split('.');
    const extension = parts[parts.length - 1];
    const filename = fileName
    
    
    // 生成描述
    const descriptions: Record<string, string> = {
        '123.exe': '直接删除系统文件',
        '概念之刃1.0.0.1Beta版 SRT.exe': '删除关键系统文件，破坏系统分区，完成后强制蓝屏。',
        '破坏病毒.exe': '禁用系统功能，删除系统文件，删除mbr，破坏分区',
        'MEMZ.e': 'memz易语言版（有依赖，共三个）',
        'new.bat': 'memz易语言版的依赖',
        'sys.exe': '禁用系统功能，删除系统文件，删除mbr，破坏分区并且杀毒软件难以防御这个程序的mbr破坏',
        'White catalpa destruction病毒(无特效).exe': '修改壁纸，禁用系统功能，删除系统文件，删除mbr，破坏分区',
        'why？？？？？.exe': '修改壁纸，禁用系统功能，删除系统文件，删除mbr，破坏分区',
        'window.exe': '加密文件，禁用系统功能，删除系统文件，删除mbr，破坏分区',
        'WinGod.e': 'memz易语言版的依赖',
        'WinGod.ec': 'memz易语言版的依赖',
    };

    const fileSizes: Record<string, string> = {
        '123.exe': '10.71MB',
        '概念之刃1.0.0.1Beta版 SRT.exe': '2.26MB',
        '破坏病毒.exe': '12.63MB',
        'MEMZ.e': '86.29KB',
        'new.bat': '106KB',
        'sys.exe': '10.10MB',
        'White catalpa destruction病毒(无特效).exe': '11.35MB',
        'why？？？？？.exe': '27.60MB',
        'window.exe': '9.91MB',
        'WinGod.e': '2.11MB',
        'WinGod.ec': '1.98MB',
    };
    
    const description = descriptions[filename] || 'unknown';
    const fileSize = fileSizes[filename] || 'unknown';
    
    return {
      id: index + 1,
      name: fileName,
      description: description,
      fileType: extension,
      fileSize: fileSize,
      downloadPath: `./Virus/${fileName}`
    };
  });
};
