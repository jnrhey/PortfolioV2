 // Audio Player Controls
 const audio = document.getElementById('bgMusic');
 const playPauseBtn = document.getElementById('playPauseBtn');
 const volumeSlider = document.getElementById('volumeSlider');
 const volumeIcon = document.getElementById('volumeIcon');

 // initial volume to 20% 
 audio.volume = 0.2;
 volumeSlider.value = 0.3;

 // autoplay immediately
 window.addEventListener('load', function() {
     audio.play().catch(function(error) {
         console.log("Autoplay failed. Waiting for user interaction:", error);
     });
 });

 // Backup autoplay 
 document.addEventListener('click', function initAudio() {
     if (audio.paused) {
         audio.play().catch(function(error) {
             console.log("Audio play failed:", error);
         });
     }
     document.removeEventListener('click', initAudio);
 }, { once: true });

 // Play/Pause button
 playPauseBtn.addEventListener('click', function() {
     if (audio.paused) {
         audio.play();
         playPauseBtn.innerHTML = '⏸️';
     } else {
         audio.pause();
         playPauseBtn.innerHTML = '▶️';
     }
 });

 // Update play button state when audio starts playing
 audio.addEventListener('play', function() {
     playPauseBtn.innerHTML = '⏸️';
 });

 // Volume control
 volumeSlider.addEventListener('input', function() {
     audio.volume = this.value;
     updateVolumeIcon(this.value);
 });

 function updateVolumeIcon(volume) {
     if (volume == 0) {
         volumeIcon.innerHTML = '🔇';
     } else if (volume < 0.5) {
         volumeIcon.innerHTML = '🔉';
     } else {
         volumeIcon.innerHTML = '🔊';
     }
 }

 // Update play/pause button state when audio ends
 audio.addEventListener('ended', function() {
     playPauseBtn.innerHTML = '▶️';
 });

 // Close mobile menu when clicking a link
 document.querySelectorAll('.nav-link').forEach(link => {
     link.addEventListener('click', () => {
         const navbarCollapse = document.querySelector('.navbar-collapse');
         if (navbarCollapse.classList.contains('show')) {
             navbarCollapse.classList.remove('show');
         }
     });
 });