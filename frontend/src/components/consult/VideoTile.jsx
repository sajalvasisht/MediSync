import React, { useState } from 'react';
import doctorLoopVideo from '../../assets/consult/doctor-loop.mp4';
import './VideoTile.css';

const VideoTile = ({ name, role, isSelf, isMuted, isCameraOff, videoSrc = doctorLoopVideo }) => {
  const [videoError, setVideoError] = useState(false);

  return (
    <div className={`video-tile${isSelf ? ' video-tile--self' : ' video-tile--remote'}`}>
      {!isCameraOff ? (
        <div className="video-tile__stream">
          {!isSelf && videoSrc && !videoError ? (
            <>
              <video
                src={videoSrc}
                autoPlay
                loop
                muted
                playsInline
                className="video-tile__video"
                onError={() => setVideoError(true)}
              />
              <div className="video-tile__live-scrim" />
            </>
          ) : (
            <>
              <div className="video-tile__self-bg" />
              <div className="video-tile__silhouette">
                <span className="video-tile__initials">
                  {name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </span>
              </div>
              <div className="video-tile__pulse-glow" />
            </>
          )}

          {/* Live HD Tag on remote stream */}
          {!isSelf && !videoError && (
            <div className="video-tile__stream-status">
              <span className="stream-status-dot" />
              <span>HD 1080p &bull; Secure P2P</span>
            </div>
          )}
        </div>
      ) : (
        <div className="video-tile__cam-off">
          <div className="cam-off-avatar">
            {name.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>
          <span className="cam-off-label">Camera is turned off</span>
        </div>
      )}

      {/* Floating overlay tag */}
      <div className="video-tile__info-tag">
        <span className="video-tile__name">{name}</span>
        {role && <span className="video-tile__role">&bull; {role}</span>}
        {isMuted && <span className="video-tile__muted-flag">(Muted)</span>}
      </div>
    </div>
  );
};

export default VideoTile;
