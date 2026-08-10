import React from 'react';

// Common colors from Circuit Pack
// board: #0B3D2E, board2: #0F4D3A, copper: #C87F4D, silk: #E8E2D0
// amber: #F4B942, solder: #8FB8A8, paper: #12241D

export const WebAppSticker = ({ className = "w-12 h-12" }: { className?: string }) => (
    <svg viewBox="0 0 150 150" className={className}>
        <rect x="10" y="26" width="130" height="98" rx="12" fill="#12241D" stroke="#8FB8A8" strokeWidth="2" />
        <text x="26" y="60" fontFamily="'JetBrains Mono', monospace" fontWeight="700" fontSize="18" fill="#F4B942">&gt;_</text>
        <text x="26" y="86" fontFamily="'JetBrains Mono', monospace" fontSize="12" fill="#E8E2D0">web --dev</text>
        <rect x="26" y="94" width="42" height="10" fill="#C87F4D" />
    </svg>
);

export const AIMLSticker = ({ className = "w-12 h-12" }: { className?: string }) => (
    <svg viewBox="0 0 168 168" className={className}>
        <circle cx="84" cy="84" r="80" fill="#0F4D3A" />
        <circle cx="84" cy="84" r="80" fill="none" stroke="rgba(232,226,208,0.35)" strokeWidth="1.4" strokeDasharray="4 5" />
        <rect x="54" y="54" width="60" height="60" rx="6" fill="#12241D" stroke="#C87F4D" strokeWidth="2" />
        <rect x="66" y="66" width="36" height="36" rx="3" fill="#F4B942" />
        <g stroke="#C87F4D" strokeWidth="3" strokeLinecap="round">
            <line x1="54" y1="66" x2="42" y2="66" /><line x1="54" y1="84" x2="42" y2="84" /><line x1="54" y1="102" x2="42" y2="102" />
            <line x1="114" y1="66" x2="126" y2="66" /><line x1="114" y1="84" x2="126" y2="84" /><line x1="114" y1="102" x2="126" y2="102" />
            <line x1="66" y1="54" x2="66" y2="42" /><line x1="84" y1="54" x2="84" y2="42" /><line x1="102" y1="54" x2="102" y2="42" />
            <line x1="66" y1="114" x2="66" y2="126" /><line x1="84" y1="114" x2="84" y2="126" /><line x1="102" y1="114" x2="102" y2="126" />
        </g>
        <text x="84" y="146" textAnchor="middle" fontFamily="'Rajdhani', sans-serif" fontWeight="700" fontSize="19" fill="#E8E2D0">AI &amp; ML</text>
    </svg>
);

export const CyberSticker = ({ className = "w-12 h-12" }: { className?: string }) => (
    <svg viewBox="0 0 140 140" className={className}>
        <polygon points="70,4 90,26 118,26 122,54 140,70 122,86 118,114 90,114 70,136 50,114 22,114 18,86 0,70 18,54 22,26 50,26"
            fill="#F4B942" stroke="#12241D" strokeWidth="2" />
        <g transform="translate(70,58)">
            <ellipse cx="0" cy="4" rx="14" ry="18" fill="#12241D" />
            <line x1="-14" y1="-6" x2="-24" y2="-14" stroke="#12241D" strokeWidth="3" strokeLinecap="round" />
            <line x1="14" y1="-6" x2="24" y2="-14" stroke="#12241D" strokeWidth="3" strokeLinecap="round" />
            <line x1="-14" y1="4" x2="-26" y2="4" stroke="#12241D" strokeWidth="3" strokeLinecap="round" />
            <line x1="14" y1="4" x2="26" y2="4" stroke="#12241D" strokeWidth="3" strokeLinecap="round" />
            <line x1="-14" y1="14" x2="-24" y2="22" stroke="#12241D" strokeWidth="3" strokeLinecap="round" />
            <line x1="14" y1="14" x2="24" y2="22" stroke="#12241D" strokeWidth="3" strokeLinecap="round" />
        </g>
        <text x="70" y="100" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontWeight="500" fontSize="9" fill="#12241D">CYBER OP</text>
        <text x="70" y="112" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="7" fill="#12241D">0-DAY · DEFEND</text>
    </svg>
);

export const IoTCloudSticker = ({ className = "w-12 h-12" }: { className?: string }) => (
    <svg viewBox="0 0 120 120" className={className}>
        <circle cx="60" cy="60" r="56" fill="#C87F4D" />
        <circle cx="60" cy="60" r="56" fill="none" stroke="rgba(232,226,208,0.35)" strokeWidth="1.4" strokeDasharray="4 5" />
        <circle cx="60" cy="60" r="46" fill="none" stroke="#12241D" strokeWidth="2" />
        <path d="M46 36 L74 36 L74 44 L62 44 L62 58 L52 58 L52 44 L46 44 Z" fill="#12241D" />
        <text x="60" y="88" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontWeight="500" fontSize="9" letterSpacing="1.5" fill="#12241D">CLOUD</text>
        <text x="60" y="100" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="7" fill="#12241D">IOT NODE</text>
    </svg>
);

export const SkillChallengesSticker = ({ className = "w-12 h-12" }: { className?: string }) => (
    <svg viewBox="0 0 120 120" className={className}>
        <circle cx="60" cy="60" r="56" fill="#F4B942" />
        <circle cx="60" cy="60" r="56" fill="none" stroke="rgba(232,226,208,0.35)" strokeWidth="1.4" strokeDasharray="4 5" />
        <circle cx="60" cy="60" r="46" fill="none" stroke="#12241D" strokeWidth="2" />
        <polygon points="60,32 66,48 82,48 69,58 74,74 60,64 46,74 51,58 38,48 54,48" fill="#12241D" />
        <text x="60" y="90" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontWeight="500" fontSize="9" letterSpacing="1.5" fill="#12241D">CHALLENGE</text>
        <text x="60" y="102" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="7" fill="#12241D">SKILL SPRINT</text>
    </svg>
);

export const PeerNetworkSticker = ({ className = "w-12 h-12" }: { className?: string }) => (
    <svg viewBox="0 0 120 120" className={className}>
        <circle cx="60" cy="60" r="56" fill="#12241D" />
        <circle cx="60" cy="60" r="56" fill="none" stroke="rgba(232,226,208,0.35)" strokeWidth="1.4" strokeDasharray="4 5" />
        <circle cx="60" cy="60" r="46" fill="none" stroke="#8FB8A8" strokeWidth="2" />
        <path d="M60 34 L72 52 L60 60 L48 52 Z" fill="#8FB8A8" />
        <text x="60" y="88" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontWeight="500" fontSize="9" letterSpacing="1.5" fill="#E8E2D0">NETWORK</text>
        <text x="60" y="100" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="7" fill="#F4B942">PEER SYNC</text>
    </svg>
);

export const ProofOfWorkSticker = ({ className = "w-12 h-12" }: { className?: string }) => (
    <svg viewBox="0 0 150 150" className={className}>
        <rect x="6" y="6" width="138" height="138" rx="18" fill="#C87F4D" />
        <rect x="6" y="6" width="138" height="138" rx="18" fill="none" stroke="rgba(232,226,208,0.35)" strokeWidth="1.4" strokeDasharray="4 5" />
        <rect x="24" y="22" width="102" height="72" rx="6" fill="#E8E2D0" />
        <g fill="#12241D">
            <rect x="32" y="30" width="14" height="14" /><rect x="52" y="30" width="8" height="8" />
            <rect x="70" y="30" width="14" height="14" /><rect x="94" y="30" width="14" height="14" />
            <rect x="32" y="50" width="8" height="8" /><rect x="60" y="48" width="14" height="14" />
            <rect x="88" y="50" width="8" height="8" /><rect x="106" y="48" width="10" height="14" />
            <rect x="32" y="70" width="14" height="14" /><rect x="52" y="72" width="8" height="8" />
            <rect x="76" y="70" width="14" height="14" /><rect x="98" y="72" width="10" height="10" />
        </g>
        <text x="75" y="118" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontWeight="700" fontSize="13" fill="#12241D">Proof of Work</text>
        <text x="75" y="132" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="7.5" fill="#12241D" opacity="0.8">SCAN → PORTFOLIO</text>
    </svg>
);
