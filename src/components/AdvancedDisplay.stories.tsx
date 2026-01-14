import type { Meta, StoryObj } from '@storybook/react';
import {
  NexusAccordion,
  NexusAccordionContent,
  NexusAccordionItem,
  NexusAccordionTrigger,
} from './Accordion/NexusAccordion';
import { NexusImageList, NexusImageListItem } from './ImageList/NexusImageList';
import { NexusCalendar, NexusDatePicker, NexusDateField } from './DatePicker/NexusDatePicker';
import { useState } from 'react';

const meta = {
  title: 'Display/Advanced',
  tags: ['autodocs'],
} satisfies Meta<typeof NexusAccordion>;

export default meta;

/* --- Accordion --- */
export const AccordionExample: StoryObj<typeof NexusAccordion> = {
  render: () => (
    <NexusAccordion type="single" collapsible className="w-full">
      <NexusAccordionItem value="item-1">
        <NexusAccordionTrigger>Is it accessible?</NexusAccordionTrigger>
        <NexusAccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </NexusAccordionContent>
      </NexusAccordionItem>
      <NexusAccordionItem value="item-2">
        <NexusAccordionTrigger>Is it styled?</NexusAccordionTrigger>
        <NexusAccordionContent>
          Yes. It comes with default styles that matches the other components' aesthetic.
        </NexusAccordionContent>
      </NexusAccordionItem>
      <NexusAccordionItem value="item-3">
        <NexusAccordionTrigger>Is it animated?</NexusAccordionTrigger>
        <NexusAccordionContent>
          Yes. It's animated by default, but you can disable it if you prefer.
        </NexusAccordionContent>
      </NexusAccordionItem>
    </NexusAccordion>
  )
};

/* --- Image List --- */
const itemData = [
  { img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e', title: 'Breakfast', rows: 2, cols: 2 },
  { img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d', title: 'Burger' },
  { img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45', title: 'Camera' },
  { img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c', title: 'Coffee', cols: 2 },
  { img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8', title: 'Hats', cols: 2 },
  { img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62', title: 'Honey', author: '@arwinneil', rows: 2, cols: 2 },
  { img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6', title: 'Basketball' },
  { img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f', title: 'Fern' },
];

export const ImageListExample: StoryObj<typeof NexusImageList> = {
    render: () => (
        <NexusImageList cols={4} gap={2}>
            {itemData.map((item) => (
                <NexusImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
                    <img
                        src={`${item.img}?w=500&fit=crop&auto=format`}
                        srcSet={`${item.img}?w=500&fit=crop&auto=format&dpr=2 2x`}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover"
                    />
                     <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-sm opacity-0 hover:opacity-100 transition-opacity">
                        {item.title}
                     </div>
                </NexusImageListItem>
            ))}
        </NexusImageList>
    )
};

/* --- Date Picker --- */
export const DateComponents = () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    
    return (
        <div className="flex flex-col gap-10 p-8 w-full max-w-4xl">
            
            {/* 1. Date Field Only */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Campo de Data (Input)</h3>
                <div className="w-[300px]">
                     <NexusDateField 
                        label="Data de Nascimento" 
                        value={date} 
                     />
                </div>
            </div>

            {/* 2. Date Picker (Input + Popover) */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Seletor de Data (Dropdown)</h3>
                <div className="w-[300px]">
                    <NexusDatePicker 
                        label="Agendar para"
                        date={date}
                        onSelect={setDate}
                    />
                </div>
            </div>

            {/* 3. Static Calendar */}
             <div className="space-y-4">
                <h3 className="text-lg font-semibold">Calendário Estático</h3>
                <div className="w-fit border rounded-lg p-4 bg-card">
                    <NexusCalendar 
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                    />
                </div>
            </div>

            <div className="text-center mt-4 border-t pt-4 text-sm text-muted-foreground w-[300px]">
                Seleção Global: {date ? date.toLocaleDateString('pt-BR') : 'Nenhuma'}
            </div>
        </div>
    );
};
