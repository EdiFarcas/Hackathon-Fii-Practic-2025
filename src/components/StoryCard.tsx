import React from 'react';

interface StoryCardProps {
    title: string;
    description: string;
    solution: string;
}

const StoryCard: React.FC<StoryCardProps> = ({ title, description, solution }) => {
    return (
        <div style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '16px',
            maxWidth: '400px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            background: '#fff',
            margin: '16px auto'
        }}>
            <h2 style={{ margin: '0 0 8px 0' }}>{title}</h2>
            <p style={{ margin: '0 0 12px 0', color: '#555' }}>{description}</p>
            <div>
                <strong>Solution:</strong>
                <p style={{ margin: '4px 0 0 0', color: '#333' }}>{solution}</p>
            </div>
        </div>
    );
};

export default StoryCard;