export interface VirusFile {
  id: number;
  name: string;
  description: string;
  fileType: string;
  fileSize: string;
  downloadPath: string;
  analysisReport: string | null;
}

export const getVirusFiles = async (): Promise<VirusFile[]> => {
  const fileList = [
    '123.exe',
    '概念之刃1.0.0.1Beta版 SRT.exe',
    '概念之刃2.0.0.1ltscSRT&DM_slowly.exe',
    '概念之刃2.0.2.1ltscSRT&DM.exe',
    '概念之刃3.02.6 Beta SRT&DM.exe',
    '概念之刃3.02.6 LTSC SRT&DM.exe',
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
        '概念之刃1.0.0.1Beta版 SRT.exe': '删除关键系统文件，破坏系统分区，完成后强制蓝屏。（Bug较多）',
        '概念之刃2.0.0.1ltscSRT&DM_slowly.exe': '删除关键系统文件，破坏系统分区，完成后强制蓝屏。（较慢的2.0.0.1版本）',
        '概念之刃2.0.2.1ltscSRT&DM.exe': '删除关键系统文件，破坏系统分区，完成后强制蓝屏。（2.0.2.1版本）',
        '概念之刃3.02.6 Beta SRT&DM.exe': '删除关键系统文件，破坏系统分区，完成后强制蓝屏。（3.0.2.6版本，有壁纸版）',
        '概念之刃3.02.6 LTSC SRT&DM.exe': '删除关键系统文件，破坏系统分区，完成后强制蓝屏。（3.0.2.6版本，无壁纸版）',
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
        '概念之刃2.0.0.1ltscSRT&DM_slowly.exe': '2.27MB',
        '概念之刃2.0.2.1ltscSRT&DM.exe': '2.26MB',
        '概念之刃3.02.6 Beta SRT&DM.exe': '2.24MB',
        '概念之刃3.02.6 LTSC SRT&DM.exe': '227KB',
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

    const analysisReports: Record<string, string> = {
        '概念之刃1.0.0.1Beta版 SRT.exe': 'https://s.threatbook.com/report/file/2d1cf629edeb200bba983a604dae74ebffe45e068526b0bfece5b5679e138136?sign=history&env=win10_1903_enx64_office2016',
        '概念之刃2.0.0.1ltscSRT&DM_slowly.exe': 'https://s.threatbook.com/report/file/550f36370381f6b5063fd99a34a43b47b44dfb62ebc8b89b01db290e7c9731e1',
        '概念之刃2.0.2.1ltscSRT&DM.exe': 'https://s.threatbook.com/report/file/8d56b7f31cb332422784e893aa49af1a6f5e67e58cc7d36a4c527da9a8afa1c3',
        '概念之刃3.02.6 Beta SRT&DM.exe': 'https://s.threatbook.com/report/file/e38f298590efd1acbc98397bbcd7cbc1ceb57105ff559ba8f65b46b60e128a99',
        '概念之刃3.02.6 LTSC SRT&DM.exe': 'https://s.threatbook.com/report/file/af06ee4b97f99f58148b7bcac4c620707a10c7c9affc86608cdd5c74baabce1b',
    }
    
    const description = descriptions[filename] || 'unknown';
    const fileSize = fileSizes[filename] || 'unknown';
    const analysisReport = analysisReports[filename] || null;
    
    return {
      id: index + 1,
      name: fileName,
      description: description,
      fileType: extension,
      fileSize: fileSize,
      downloadPath: `./Virus/${fileName}`,
      analysisReport: analysisReport
    };
  });
};
