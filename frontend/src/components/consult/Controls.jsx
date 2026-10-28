import React from 'react';
import { Mic, MicOff, Video, VideoOff, PhoneOff, MessageSquare, Share2, Settings } from 'lucide-react';
import './Controls.css';

const Controls = ({
  isMicOn,
  isVideoOn,
  onToggleMic,
  onToggleVideo,
  onToggleChat,
  isChatOpen,
  onEndCall,
}) => {
  return (
    <div className="consult-controls-bar" role="toolbar" aria-label="Call controls">
      {/* Mic */}
      <button
        type="button"
        className={`ctrl-btn${!isMicOn ? ' ctrl-btn--off' : ''}`}
        onClick={onToggleMic}
        aria-label={isMicOn ? 'Mute microphone' : 'Unmute microphone'}
        title={isMicOn ? 'Mute Mic' : 'Unmute Mic'}
      >
        {isMicOn ? <Mic size={18} /> : <MicOff size={18} />}
      </button>

      {/* Video */}
      <button
        type="button"
        className={`ctrl-btn${!isVideoOn ? ' ctrl-btn--off' : ''}`}
        onClick={onToggleVideo}
        aria-label={isVideoOn ? 'Turn camera off' : 'Turn camera on'}
        title={isVideoOn ? 'Camera Off' : 'Camera On'}
      >
        {isVideoOn ? <Video size={18} /> : <VideoOff size={18} />}
      </button>

      {/* Chat toggle */}
      <button
        type="button"
        className={`ctrl-btn${isChatOpen ? ' ctrl-btn--active' : ''}`}
        onClick={onToggleChat}
        aria-label="Toggle consultation chat"
        title="Consultation Chat"
      >
        <MessageSquare size={18} />
      </button>

      {/* End Call */}
      <button
        type="button"
        className="ctrl-btn ctrl-btn--end"
        onClick={onEndCall}
        aria-label="End consultation"
        title="End Call"
      >
        <PhoneOff size={18} />
      </button>
    </div>
  );
};

export default Controls;
