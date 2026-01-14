import type { Meta, StoryObj } from '@storybook/react';
import { NexusFileUpload } from './NexusFileUpload';
import { NexusFilePreview } from './NexusFilePreview';
import { useState } from 'react';

const meta: Meta<typeof NexusFileUpload> = {
  title: 'Input/NexusFileUpload',
  component: NexusFileUpload,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof NexusFileUpload>;

export const Default: Story = {
  render: () => {
      const [files, setFiles] = useState<File[]>([])

      return (
          <div className="space-y-6 max-w-xl">
              <NexusFileUpload 
                  onFilesSelected={(newFiles) => setFiles(prev => [...prev, ...newFiles])}
                  multiple
                  accept={['image/*', 'video/*']}
              />
              
              <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Arquivos Selecionados ({files.length})</h3>
                  <div className="grid gap-2">
                      {files.map((file, i) => (
                          <NexusFilePreview 
                            key={i} 
                            file={file} 
                            onRemove={() => setFiles(prev => prev.filter((_, idx) => idx !== i))} 
                          />
                      ))}
                      {files.length === 0 && <p className="text-sm text-muted-foreground/50 italic">Nenhum arquivo.</p>}
                  </div>
              </div>
          </div>
      )
  }
};

export const VideoSupport: Story = {
    render: () => (
        <NexusFileUpload 
            onFilesSelected={() => {}}
            label="Upload de Vídeo"
            description="MP4, WebM"
            accept={['video/mp4', 'video/webm']}
        />
    )
}
