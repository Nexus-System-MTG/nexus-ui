import type { Meta, StoryObj } from '@storybook/react';
import { NexusLoginTemplate } from './NexusLoginTemplate';
import { NexusInput } from '../Input/NexusInput';
import { Button } from '../Button/Button';
import { NexusCheckbox } from '../Checkbox/NexusCheckbox';

const meta: Meta<typeof NexusLoginTemplate> = {
  title: 'Templates/Login Screen',
  component: NexusLoginTemplate,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof NexusLoginTemplate>;

const logo = (
    <div className="flex items-center gap-2 font-bold text-2xl">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center shadow-lg">
             <span className="material-symbols-outlined text-white text-2xl">bolt</span>
        </div>
        <span>Nexus UI</span>
    </div>
);

export const Default: Story = {
  args: {
      logo: logo
  },
  render: (args) => (
      <NexusLoginTemplate {...args}>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <NexusInput 
                  label="Email" 
                  placeholder="seu@email.com" 
                  leftIcon="mail"
                  type="email"
              />
              <NexusInput 
                  label="Senha" 
                  placeholder="••••••••" 
                  leftIcon="lock"
                  isPassword
              />
              
              <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                      <NexusCheckbox id="remember" />
                      <label htmlFor="remember" className="text-muted-foreground cursor-pointer">Lembrar de mim</label>
                  </div>
                  <a href="#" className="font-medium text-primary hover:underline">Esqueceu a senha?</a>
              </div>

              <Button className="w-full h-11 text-base shadow-lg shadow-blue-500/20" size="lg">Entrar na Conta</Button>

              <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                  </div>
              </div>

              <Button variant="outline" className="w-full h-11" type="button">
                  <span className="material-symbols-outlined mr-2">g_translate</span>
                  Google
              </Button>
          </form>
      </NexusLoginTemplate>
  )
};
