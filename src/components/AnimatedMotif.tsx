"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function AnimatedMotif() {
    const [nodes, setNodes] = useState<{ id: number; x: number; y: number; s: number }[]>([]);

    useEffect(() => {
        // Generate random nodes only on the client
        const numNodes = typeof window !== 'undefined' && window.innerWidth < 768 ? 15 : 30;
        const newNodes = Array.from({ length: numNodes }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            s: Math.random() * 0.5 + 0.5, // scale
        }));
        setNodes(newNodes);
    }, []);

    return (
        <div className="absolute inset-0 z-0 overflow-hidden opacity-30 pointer-events-none">
            <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="var(--color-karma)" stopOpacity="0.1" />
                    </linearGradient>
                </defs>

                {/* Draw lines connecting nearby nodes */}
                {nodes.map((n1, i) =>
                    nodes.slice(i + 1).map((n2) => {
                        const dist = Math.hypot(n1.x - n2.x, n1.y - n2.y);
                        if (dist < 20) {
                            return (
                                <motion.line
                                    key={`${n1.id}-${n2.id}`}
                                    x1={`${n1.x}%`}
                                    y1={`${n1.y}%`}
                                    x2={`${n2.x}%`}
                                    y2={`${n2.y}%`}
                                    stroke="url(#lineGrad)"
                                    strokeWidth="0.5"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 1 }}
                                    transition={{ duration: 2, delay: i * 0.05 + 0.5, ease: "easeOut" }}
                                />
                            );
                        }
                        return null;
                    })
                )}
            </svg>
            {nodes.map((node, i) => (
                <motion.div
                    key={node.id}
                    className="absolute rounded-full bg-primary mix-blend-screen"
                    style={{
                        left: `${node.x}%`,
                        top: `${node.y}%`,
                        width: `${node.s * 8}px`,
                        height: `${node.s * 8}px`,
                        boxShadow: `0 0 ${node.s * 15}px var(--color-primary)`,
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.8 }}
                    transition={{ duration: 1, delay: i * 0.05, type: "spring" }}
                />
            ))}
        </div>
    );
}
