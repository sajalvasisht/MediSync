import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Video, Mic, ArrowLeft, Clock, CheckCircle2 } from 'lucide-react';
import VideoTile from '../../components/consult/VideoTile';
import Controls from '../../components/consult/Controls';
import ChatPanel from '../../components/consult/ChatPanel';
import Badge from '../../components/common/Badge';
import './ConsultRoom.css';

const ConsultRoom = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const [inCall, setInCall] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [callSeconds, setCallSeconds] = useState(0);

  // Call timer simulation
  useEffect(() => {
    let timer;
    if (inCall) {
      timer = setInterval(() => {
        setCallSeconds((s) => s + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [inCall]);

  const formatTimer = (totalSec) => {
    const mins = Math.floor(totalSec / 60).toString().padStart(2, '0');
    const secs = (totalSec % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const handleEndCall = () => {
    setInCall(false);
    navigate('/dashboard/patient');
  };

  return (
    <div className="consult-room-page">
      {!inCall ? (
        /* ── Waiting Room / Device Pre-check View ── */
        <div className="waiting-room-container">
          <div className="waiting-card">
            <Link to="/dashboard/patient" className="waiting-back-link">
              <ArrowLeft size={14} />
              <span>Back to Dashboard</span>
            </Link>

            <Badge variant="sage" className="waiting-badge">
              DEVICE PREVIEW &bull; WAITING ROOM
            </Badge>

            <h1 className="waiting-title text-display">Ready to Connect?</h1>
            <p className="waiting-subtitle">
              Room: <span className="font-mono">{roomId}</span> &bull; Check your camera and microphone levels before joining Dr. Priya Sharma.
            </p>

            {/* Simulated self-preview screen */}
            <div className="device-preview-screen">
              {isVideoOn ? (
                <div className="preview-active-stream">
                  <div className="preview-silhouette">
                    <span>VK</span>
                  </div>
                  <div className="preview-status-pill">
                    <span className="preview-dot" />
                    <span>HD 1080p CAMERA READY</span>
                  </div>
                </div>
              ) : (
                <div className="preview-off-stream">
                  <span>Camera Disabled</span>
                </div>
              )}
            </div>

            {/* Device toggles */}
            <div className="preview-toggles-row">
              <button
                type="button"
                className={`preview-toggle-btn${isMicOn ? ' is-on' : ' is-off'}`}
                onClick={() => setIsMicOn(!isMicOn)}
              >
                <Mic size={16} />
                <span>{isMicOn ? 'Microphone Active' : 'Microphone Muted'}</span>
              </button>

              <button
                type="button"
                className={`preview-toggle-btn${isVideoOn ? ' is-on' : ' is-off'}`}
                onClick={() => setIsVideoOn(!isVideoOn)}
              >
                <Video size={16} />
                <span>{isVideoOn ? 'Camera Active' : 'Camera Disabled'}</span>
              </button>
            </div>

            <button
              type="button"
              className="enter-consult-btn"
              onClick={() => setInCall(true)}
            >
              <Video size={18} />
              <span>Enter Consultation Studio</span>
            </button>

            <div className="waiting-security-note">
              <ShieldCheck size={16} />
              <span>End-to-end encrypted medical stream. No recording without explicit patient consent.</span>
            </div>
          </div>
        </div>
      ) : (
        /* ── Live Consultation Screen ── */
        <div className="live-call-container">
          {/* Top header bar */}
          <div className="call-top-bar">
            <div className="call-header-left">
              <div className="call-live-indicator">
                <span className="live-pulse" />
                <span>LIVE CONSULT</span>
              </div>
              <span className="call-room-code">Room: {roomId}</span>
            </div>

            <div className="call-timer-chip">
              <Clock size={13} />
              <span>{formatTimer(callSeconds)}</span>
            </div>

            <div className="call-security-pill">
              <ShieldCheck size={14} />
              <span>256-bit Encrypted</span>
            </div>
          </div>

          {/* Video Stage */}
          <div className="video-stage">
            {/* Main Remote Doctor Tile */}
            <VideoTile
              name="Dr. Priya Sharma"
              role="Cardiology"
              isSelf={false}
              isMuted={false}
              isCameraOff={false}
            />

            {/* Self Picture-in-Picture Tile */}
            <VideoTile
              name="You (Vikramaditya)"
              isSelf={true}
              isMuted={!isMicOn}
              isCameraOff={!isVideoOn}
            />

            {/* Slide-in Chat */}
            <ChatPanel
              isOpen={isChatOpen}
              onClose={() => setIsChatOpen(false)}
            />
          </div>

          {/* Bottom Floating Controls */}
          <div className="call-bottom-controls">
            <Controls
              isMicOn={isMicOn}
              isVideoOn={isVideoOn}
              onToggleMic={() => setIsMicOn(!isMicOn)}
              onToggleVideo={() => setIsVideoOn(!isVideoOn)}
              onToggleChat={() => setIsChatOpen(!isChatOpen)}
              isChatOpen={isChatOpen}
              onEndCall={handleEndCall}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsultRoom;
