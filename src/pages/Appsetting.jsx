import React, { useState } from 'react';
import { Moon, Sun, Bell, Globe, Eye, Lock, LayoutGrid, Type, Palette } from 'lucide-react';
import useThemeStore from '../store/themeStore';
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"

export default function AppSetting() {
  const { isDarkMode, toggleTheme } = useThemeStore();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [language, setLanguage] = useState('en');
  const [fontSize, setFontSize] = useState(16);
  const [colorTheme, setColorTheme] = useState('default');
  const [compactMode, setCompactMode] = useState(false);
  const [highContrastMode, setHighContrastMode] = useState(false);
  const [screenReaderOptimized, setScreenReaderOptimized] = useState(false);
  const [dataCollection, setDataCollection] = useState('essential');

  return (
    <div className="p-6 space-y-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">App Settings</h1>
      
      <div className="space-y-6">
        <Separator className="my-4" />
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Appearance</h2>

        {/* Theme Setting */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {isDarkMode ? <Moon className="h-5 w-5 text-gray-400" /> : <Sun className="h-5 w-5 text-yellow-400" />}
            <Label htmlFor="theme-toggle" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Dark Mode
            </Label>
          </div>
          <Switch
            id="theme-toggle"
            checked={isDarkMode}
            onCheckedChange={toggleTheme}
          />
        </div>

        {/* Font Size Setting */}
        <div className="space-y-2">
          <Label htmlFor="font-size" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            <div className="flex items-center space-x-2">
              <Type className="h-5 w-5 text-gray-400 dark:text-gray-300" />
              <span>Font Size</span>
            </div>
          </Label>
          <div className="flex items-center space-x-4">
            <Slider
              id="font-size"
              min={12}
              max={24}
              step={1}
              value={[fontSize]}
              onValueChange={(value) => setFontSize(value[0])}
              className="w-full"
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-12 text-right">
              {fontSize}px
            </span>
          </div>
        </div>

        {/* Color Theme Setting */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            <div className="flex items-center space-x-2">
              <Palette className="h-5 w-5 text-gray-400 dark:text-gray-300" />
              <span>Color Theme</span>
            </div>
          </Label>
          <RadioGroup value={colorTheme} onValueChange={setColorTheme} className="flex space-x-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="default" id="theme-default" />
              <Label htmlFor="theme-default">Default</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="nature" id="theme-nature" />
              <Label htmlFor="theme-nature">Nature</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="ocean" id="theme-ocean" />
              <Label htmlFor="theme-ocean">Ocean</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Compact Mode Setting */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <LayoutGrid className="h-5 w-5 text-gray-400 dark:text-gray-300" />
            <Label htmlFor="compact-mode" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Compact Mode
            </Label>
          </div>
          <Switch
            id="compact-mode"
            checked={compactMode}
            onCheckedChange={setCompactMode}
          />
        </div>

        <Separator className="my-4" />
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Accessibility</h2>

        {/* High Contrast Mode Setting */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Eye className="h-5 w-5 text-gray-400 dark:text-gray-300" />
            <Label htmlFor="high-contrast" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              High Contrast Mode
            </Label>
          </div>
          <Switch
            id="high-contrast"
            checked={highContrastMode}
            onCheckedChange={setHighContrastMode}
          />
        </div>

        {/* Screen Reader Optimization Setting */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-gray-400 dark:text-gray-300" />
            <Label htmlFor="screen-reader" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Screen Reader Optimization
            </Label>
          </div>
          <Switch
            id="screen-reader"
            checked={screenReaderOptimized}
            onCheckedChange={setScreenReaderOptimized}
          />
        </div>

        <Separator className="my-4" />
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">General</h2>

        {/* Notification Setting */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-gray-400 dark:text-gray-300" />
            <Label htmlFor="notifications-toggle" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Enable Notifications
            </Label>
          </div>
          <Switch
            id="notifications-toggle"
            checked={notificationsEnabled}
            onCheckedChange={setNotificationsEnabled}
          />
        </div>

        {/* Language Setting */}
        <div className="space-y-2">
          <Label htmlFor="language-select" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            <div className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-gray-400 dark:text-gray-300" />
              <span>Language</span>
            </div>
          </Label>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger id="language-select" className="w-full">
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Español</SelectItem>
              <SelectItem value="fr">Français</SelectItem>
              <SelectItem value="de">Deutsch</SelectItem>
              <SelectItem value="ar">العربية</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator className="my-4" />
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Privacy</h2>

        {/* Data Privacy Setting */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            <div className="flex items-center space-x-2">
              <Lock className="h-5 w-5 text-gray-400 dark:text-gray-300" />
              <span>Data Collection</span>
            </div>
          </Label>
          <RadioGroup value={dataCollection} onValueChange={setDataCollection} className="space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="essential" id="data-essential" />
              <Label htmlFor="data-essential">Essential Only</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="functional" id="data-functional" />
              <Label htmlFor="data-functional">Functional</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="data-all" />
              <Label htmlFor="data-all">All Data</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400">
        These settings will be saved automatically and applied across your account.
      </p>
    </div>
  );
}