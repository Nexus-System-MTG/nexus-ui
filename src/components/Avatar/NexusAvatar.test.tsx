import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { NexusAvatar, NexusAvatarFallback, NexusAvatarImage } from './NexusAvatar';

// Mock Radix Avatar Image to force render in jsdom
vi.mock('@radix-ui/react-avatar', async () => {
    const actual = await vi.importActual('@radix-ui/react-avatar');
    return {
        ...actual as any,
        Image: (props: any) => <img {...props} />,
        Root: (props: any) => <div {...props} />,
        Fallback: (props: any) => <span {...props} />,
    };
});

describe('NexusAvatar', () => {
    it('renders fallback', () => {
        render(
            <NexusAvatar>
                <NexusAvatarFallback>JD</NexusAvatarFallback>
            </NexusAvatar>
        );
        expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('renders image', () => {
         render(
            <NexusAvatar>
                <NexusAvatarImage src="https://example.com/avatar.jpg" alt="Avatar" />
            </NexusAvatar>
        );
        const img = screen.getByRole('img', { name: /avatar/i });
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('src', 'https://example.com/avatar.jpg');
    });
});
