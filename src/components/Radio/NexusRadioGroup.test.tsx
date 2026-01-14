import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { NexusRadioGroup, NexusRadioGroupItem } from './NexusRadioGroup';

describe('NexusRadioGroup', () => {
  it('renders correctly', () => {
    render(
      <NexusRadioGroup defaultValue="1">
        <NexusRadioGroupItem value="1" aria-label="One" />
        <NexusRadioGroupItem value="2" aria-label="Two" />
      </NexusRadioGroup>
    );
    expect(screen.getAllByRole('radio')).toHaveLength(2);
  });

  it('changes selection', async () => {
    const user = userEvent.setup();
    render(
      <NexusRadioGroup defaultValue="1">
        <NexusRadioGroupItem value="1" aria-label="One" />
        <NexusRadioGroupItem value="2" aria-label="Two" />
      </NexusRadioGroup>
    );

    const radio1 = screen.getByLabelText('One');
    const radio2 = screen.getByLabelText('Two');

    expect(radio1).toBeChecked();
    await user.click(radio2);
    expect(radio2).toBeChecked();
    expect(radio1).not.toBeChecked();
  });
});
