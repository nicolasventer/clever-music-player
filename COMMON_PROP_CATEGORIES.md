# Common Prop Categories

This document outlines the standardized prop categories used across all UI components in the clever-music-player codebase. These categories ensure consistency and maintainability across the component library.

## Prop Category Overview

All components follow a consistent pattern with these prop categories, organized in a specific order for better readability and maintainability.

### 1. Core Props
Essential functionality props that define the primary behavior of the component.

**Examples:**
- `isOpen?: boolean` - Controls modal visibility
- `isActive: boolean` - Defines active state for tabs/buttons
- `order: 1 | 2 | 3 | 4 | 5 | 6` - Heading level for titles
- `disabled?: boolean` - Disables component interaction

**Usage Pattern:**
```typescript
// Core props
isOpen,
isActive,
disabled,
```

### 2. Content Props
Props for rendering content within the component.

**Examples:**
- `children?: ReactNode` - Main content
- `icon?: ReactNode` - Icon element
- `title?: string` - Text content
- `items: readonly TabItem<T>[]` - Data arrays

**Usage Pattern:**
```typescript
// Content props
children,
icon,
title,
```

### 3. Value/State Props
State management props for controlled components.

**Examples:**
- `value?: string | number` - Current value
- `setValue?: (value: string) => void` - Value setter
- `onValueChange?: (value: T) => void` - Change handler
- `initialValue?: T` - Default value

**Usage Pattern:**
```typescript
// Value/State props
value,
setValue,
onValueChange,
initialValue,
```

### 4. Styling Props
Visual appearance and theming props.

**Examples:**
- `color?: "theme" | "white" | "danger" | "warning" | "success"`
- `size?: "small" | "medium" | "large"`
- `noMargin?: boolean`
- `thick?: boolean`

**Usage Pattern:**
```typescript
// Styling props
color = "theme",
size = "medium",
noMargin = false,
```

### 5. Layout Props
Positioning, spacing, and layout-related props.

**Examples:**
- `fullWidth?: boolean`
- `fullHeight?: boolean`
- `gap?: number`
- `circular?: boolean`
- `alignItems?: "center" | "flex-start" | "flex-end" | "stretch" | "baseline"`
- `justifyContent?: "center" | "flex-start" | "flex-end" | "space-between" | "space-around" | "space-evenly"`

**Usage Pattern:**
```typescript
// Layout props
fullWidth,
gap = 16,
circular,
alignItems,
```

### 6. Behavior Props
Interactive behavior and functionality props.

**Examples:**
- `isLoading?: boolean` - Loading state
- `clearable?: boolean` - Clear functionality
- `closeOnClickOutside?: boolean` - Click outside behavior
- `shadow?: boolean` - Shadow display

**Usage Pattern:**
```typescript
// Behavior props
isLoading,
clearable = true,
closeOnClickOutside,
```

### 7. HTML Attributes
Extended HTML element attributes for accessibility and native functionality.

**Examples:**
- `className?: string` - CSS classes
- `iconProps?: HTMLAttributes<HTMLSpanElement>` - Icon element attributes
- `textProps?: HTMLAttributes<HTMLSpanElement>` - Text element attributes
- `cardProps?: TypedOmit<CardProps, "children">` - Nested component props

**Usage Pattern:**
```typescript
// HTML attributes
className,
iconProps,
textProps,
...divProps
```

## Component Implementation Pattern

All components follow this consistent structure:

```typescript
export const ComponentName = ({
    // Core props
    isOpen,
    isActive,
    
    // Content props
    children,
    icon,
    
    // Value/State props
    value,
    setValue,
    
    // Styling props
    color = "theme",
    size = "medium",
    
    // Layout props
    fullWidth,
    gap = 16,
    
    // Behavior props
    isLoading,
    clearable,
    
    // HTML attributes
    className,
    ...htmlProps
}: ComponentProps) => {
    // Component implementation
};
```

## Type Definitions Pattern

Components use a consistent type definition pattern:

```typescript
// Base props with component-specific functionality
export type BaseComponentProps = {
    // Core props
    isActive?: boolean;
    
    // Content props
    children?: ReactNode;
    
    // ... other categories
};

// Final props extending HTML attributes
export type ComponentProps = HTMLAttributes<HTMLElement> & BaseComponentProps;
```

## Benefits of This Structure

1. **Consistency** - All components follow the same prop organization
2. **Readability** - Clear separation of concerns with comments
3. **Maintainability** - Easy to find and modify specific prop types
4. **Developer Experience** - Intuitive prop ordering for component usage
5. **Type Safety** - Proper TypeScript integration with HTML attributes
6. **Documentation** - Self-documenting code structure

## Usage Guidelines

When creating new components:

1. Follow the established prop category order
2. Use descriptive comments to separate categories
3. Provide sensible default values for optional props
4. Extend appropriate HTML attributes for the element type
5. Use the `TypedOmit` utility for excluding conflicting props
6. Maintain consistency with existing component patterns

This structure ensures that all components in the codebase are predictable, maintainable, and easy to use. 