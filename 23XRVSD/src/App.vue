<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { getVirusFiles, type VirusFile } from './virusData.ts';

// 病毒数据
const viruses = ref<VirusFile[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

// 分页相关
const currentPage = ref(1);
const itemsPerPage = 6;

// 音乐播放器相关
const isPlaying = ref(false);
const currentTime = ref(0);
const duration = ref(0);
const volume = ref(1);
const currentTrack = ref(0);
const audioElement = ref<HTMLAudioElement | null>(null);

// 音乐列表
const tracks = ref<Array<{
  id: number;
  title: string;
  artist: string;
  src: string;
}>>([]);

// 添加加载音乐列表的状态
const loadingTracks = ref(true);
const tracksError = ref<string | null>(null);

// 获取 GitHub 仓库中的音乐文件
const fetchMusicFiles = async () => {
  try {
    loadingTracks.value = true;
    tracksError.value = null;
    
    // 使用 GitHub API 获取仓库内容
    const response = await fetch('https://api.github.com/repos/li958633/virusmuisc/contents');
    const files = await response.json();
    
    if (!response.ok) {
      throw new Error(files.message || '获取音乐文件列表失败');
    }
    
    // 过滤出音频文件
    const audioExtensions = ['.mp3', '.wav', '.ogg', '.flac', '.m4a', '.aac'];
    const audioFiles = files.filter((file: any) => 
      audioExtensions.some(ext => file.name.toLowerCase().endsWith(ext))
    );
    
    // 构建 tracks 数组
    tracks.value = audioFiles.map((file: any, index: number) => ({
      id: index + 1,
      title: file.name,
      artist: "未知艺术家",
      src: file.download_url // 使用 download_url 而不是 blob URL
    }));
    
  } catch (err) {
    tracksError.value = err instanceof Error ? err.message : '获取音乐文件失败';
    console.error('获取音乐文件失败:', err);
    
    // 如果获取失败，使用默认的音乐列表
    tracks.value = [
      {
        id: 1,
        title: "古风纯音乐.mp3",
        artist: "未知艺术家",
        src: "https://raw.githubusercontent.com/li958633/virusmuisc/main/%E5%8F%A4%E9%A3%8E%E7%BA%AF%E9%9F%B3%E4%B9%90.mp3"
      },
      {
        id: 2,
        title: "Creator.mp3",
        artist: "未知艺术家",
        src: "https://raw.githubusercontent.com/li958633/virusmuisc/main/Creator.mp3"
      }
    ];
  } finally {
    loadingTracks.value = false;
  }
};

// 计算总页数
const totalPages = computed(() => Math.ceil(viruses.value.length / itemsPerPage));

// 计算当前页的病毒数据
const currentViruses = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return viruses.value.slice(start, end);
});

// 分页控制
const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

// 音乐播放器控制函数
const togglePlay = () => {
  if (audioElement.value) {
    if (isPlaying.value) {
      audioElement.value.pause();
    } else {
      console.log(audioElement.value)
      audioElement.value.play();
    }
    isPlaying.value = !isPlaying.value;
  }
};

const playTrack = (index: number) => {
  currentTrack.value = index;
  // isPlaying.value = true;
  setTimeout(() => {
    if (audioElement.value) {
      audioElement.value.play();
      audioElement.value.pause();
    }

  }, 0);
};

const updateProgress = () => {
  if (audioElement.value) {
    currentTime.value = audioElement.value.currentTime;
    duration.value = audioElement.value.duration || 0;
  }
};

const formatTime = (seconds: number) => {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? '0' : ''}${sec}`;
};

const setVolume = (value: number) => {
  volume.value = value;
  if (audioElement.value) {
    audioElement.value.volume = value;
  }
};

const handleEnded = () => {
  isPlaying.value = false;
  // 自动播放下一首
  if (currentTrack.value < tracks.value.length - 1) {
    playTrack(currentTrack.value + 1);
  }
};

// 加载病毒数据
const loadVirusData = async () => {
  try {
    loading.value = true;
    error.value = null;
    viruses.value = await getVirusFiles();
  } catch (err) {
    error.value = err instanceof Error ? err.message : '加载失败';
    console.error('加载病毒数据失败:', err);
  } finally {
    loading.value = false;
  }
};

// 初始化
onMounted(() => {
  document.title = '病毒样本数据库';
  // 加载病毒数据
  loadVirusData();
  // 加载音乐文件
  fetchMusicFiles();
  if (audioElement.value) {
    audioElement.value.pause();
  }
});
</script>

<template>
  <div id="app">
    <nav class="navbar">
      <div class="nav-container">
        <img style="height: 50px;width: 50px;border-radius: 50%;" src="/Images/b_7521c364216e8645dc3d2df0ba07040f.jpg" alt="b_7521c364216e8645dc3d2df0ba07040f.jpg">
        <img style="height: 50px;width: 50px;border-radius: 50%;" src="/Images/b_4fafeea0a6cc55c497bc9a6b756bc438.jpg" alt="b_4fafeea0a6cc55c497bc9a6b756bc438.jpg">
        <a href="/" class="logo">病毒样本数据库</a>
        <p style="color: white;">出事别找我们！</p>
      </div>
    </nav>

    <header>
      <div class="container">
        <h1>病毒样本数据库</h1>
        <p class="subtitle">存储自制病毒的数据库</p>
      </div>
    </header>

    <div class="container main-content">
      <div class="content-wrapper">
        <div v-if="loading" class="loading">
          <p>正在加载病毒数据...</p>
        </div>
        
        <div v-else-if="error" class="error">
          <p>加载失败: {{ error }}</p>
          <button @click="loadVirusData" class="retry-btn">重试</button>
        </div>
        
        <template v-else>
          <div class="archive-grid">
            <div class="archive-card" v-for="virus in currentViruses" :key="virus.id">
              <div class="card-header">
                <h3>{{ virus.name }}</h3>
              </div>
              <div class="card-body">
                <p>{{ virus.description }}</p>
              </div>
              <div class="card-footer">
                <div class="file-info">
                  <span>{{ virus.fileType }}, {{ virus.fileSize }}</span>
                </div>
                <a download :href="virus.downloadPath" class="download-btn">下载</a>
              </div>
            </div>
          </div>
          
          <div class="pagination" v-if="totalPages > 1">
            <button class="page-btn" @click="prevPage" :disabled="currentPage === 1">
              <i class="fas fa-chevron-left"><</i>
            </button>
            <button 
              class="page-btn" 
              v-for="page in totalPages" 
              :key="page" 
              :class="{ active: currentPage === page }"
              @click="goToPage(page)"
            >
              {{ page }}
            </button>
            <button class="page-btn" @click="nextPage" :disabled="currentPage === totalPages">
              <i class="fas fa-chevron-right">></i>
            </button>
          </div>
        </template>
        <p class="end">特别感谢：代码小梓 贡献病毒库样本（qq号：1931688073）</p>
        <p class="end">网站搭建：@是星星与然然呀</p>
      </div>
      <!-- 音乐播放器 -->
      <!-- 在音乐播放器部分添加加载状态 -->
      <div class="music-player">
        <div class="player-header">
          <h3>音乐播放器</h3>
        </div>
        <div class="player-content">
          <div v-if="loadingTracks" class="loading-tracks">
            正在加载音乐列表...
          </div>
          <div v-else-if="tracksError" class="tracks-error">
            加载失败: {{ tracksError }}
            <button @click="fetchMusicFiles" class="retry-btn">重试</button>
          </div>
          <template v-else>
            <div class="track-info">
              <div class="track-title">{{ tracks[currentTrack]?.title }}</div>
              <div class="track-artist">{{ tracks[currentTrack]?.artist }}</div>
            </div>
            
            <div class="player-controls">
              <button @click="togglePlay" class="play-btn">
                {{ isPlaying ? '⏸' : '▶' }}
              </button>
            </div>
            
            <div class="progress-container">
              <span class="time">{{ formatTime(currentTime) }}</span>
              <div class="progress-bar">
                <div 
                  class="progress" 
                  :style="{ width: duration ? (currentTime / duration * 100) + '%' : '0%' }">
                </div>
              </div>
              <span class="time">{{ formatTime(duration) }}</span>
            </div>
            
            <div class="volume-control">
              <label for="volume">音量:</label>
              <input 
                id="volume" 
                type="range" 
                min="0" 
                max="1" 
                step="0.01" 
                :value="volume" 
                @input="(e) => setVolume(parseFloat((e.target as HTMLInputElement).value))" 
              />
            </div>
            
            <div class="playlist">
              <h4>播放列表</h4>
              <ul>
                <li 
                  v-for="(track, index) in tracks" 
                  :key="track.id" 
                  :class="{ active: currentTrack === index }"
                  @click="playTrack(index)"
                >
                  {{ track.title }}
                </li>
              </ul>
            </div>
          </template>
        </div>
      </div>
    </div>
    <!-- 隐藏的audio元素 -->
    <audio 
      ref="audioElement"
      :src="tracks[currentTrack]?.src"
      @timeupdate="updateProgress"
      @loadedmetadata="duration = audioElement?.duration || 0"
      @ended="handleEnded"
      autoplay
    ></audio>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: 'Arial', sans-serif;
  background-color: #f5f5f5;
  min-height: 100vh;
  position: relative;
  min-height: 100vh;
}

.navbar {
  background-color: #333;
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.end {
  margin: 10px;
  background-color: #f5f5f5;
  color: #333;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  gap: 1em;
}

.logo {
  color: #fff;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;
}

header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 3rem 0;
  text-align: center;
}

header h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.loading-tracks, .tracks-error {
  text-align: center;
  padding: 1rem;
  color: #666;
}

.tracks-error {
  color: #e74c3c;
}

.loading-tracks {
  color: #333;
}

.main-content {
  display: flex;
  gap: 2rem;
  position: relative;
}

.content-wrapper {
  flex: 1;
}

.music-player {
  width: 300px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  padding: 1.5rem;
  position: absolute;
  top: 10rem;
  right: -300px;
  align-self: flex-start;
}

.player-header h3 {
  margin: 0 0 1rem 0;
  color: #333;
  text-align: center;
}

.track-info {
  text-align: center;
  margin-bottom: 1.5rem;
}

.track-title {
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 0.25rem;
}

.track-artist {
  color: #666;
  font-size: 0.8rem;
}

.player-controls {
  text-align: center;
  margin-bottom: 1.5rem;
}

.play-btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  background-color: #3498db;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.play-btn:hover {
  background-color: #2980b9;
}

.progress-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.time {
  font-size: 0.8rem;
  color: #666;
  min-width: 35px;
}

.progress-bar {
  flex: 1;
  height: 5px;
  background-color: #ddd;
  border-radius: 3px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background-color: #3498db;
  transition: width 0.1s;
}

.volume-control {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.volume-control label {
  font-size: 0.9rem;
  color: #333;
}

.volume-control input {
  flex: 1;
}

.playlist h4 {
  margin-bottom: 0.5rem;
  color: #333;
}

.playlist ul {
  list-style: none;
  max-height: 200px;
  overflow-y: auto;
}

.playlist li {
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 0.9rem;
}

.playlist li:hover {
  background-color: #f0f0f0;
}

.playlist li.active {
  background-color: #3498db;
  color: white;
}

.loading, .error {
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.error {
  color: #e74c3c;
}

.retry-btn {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
  font-size: 1rem;
}

.retry-btn:hover {
  background-color: #2980b9;
}

.archive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.archive-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.archive-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 20px rgba(0,0,0,0.15);
}

.card-header {
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
}

.card-header h3 {
  color: #333;
  font-size: 1.3rem;
  margin: 0;
}

.card-body {
  padding: 1.5rem;
}

.card-body p {
  color: #666;
  line-height: 1.6;
  margin: 0;
}

.card-footer {
  padding: 1.5rem;
  background-color: #f8f9fa;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.file-info {
  display: flex;
  align-items: center;
  color: #666;
}

.file-info i {
  margin-right: 0.5rem;
  font-size: 1.2rem;
}

.download-btn {
  background-color: #27ae60;
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.download-btn:hover {
  background-color: #219653;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 2rem;
  flex-wrap: wrap;
}

.page-btn {
  background-color: white;
  border: 1px solid #ddd;
  color: #333;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.page-btn:hover:not(:disabled) {
  background-color: #f0f0f0;
}

.page-btn.active {
  background-color: #3498db;
  color: white;
  border-color: #3498db;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 1024px) {
  .main-content {
    flex-direction: column;
  }
  
  .music-player {
    width: 100%;
    position: absolute;
  }
}

@media (max-width: 768px) {
  .archive-grid {
    grid-template-columns: 1fr;
  }
  
  header h1 {
    font-size: 2rem;
  }
  
  .navbar {
    padding: 0.5rem 0;
  }
  
  .nav-container {
    flex-direction: column;
    gap: 1rem;
  }
  
  .card-footer {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
  
  .pagination {
    gap: 0.25rem;
  }
  
  .page-btn {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }
}
</style>