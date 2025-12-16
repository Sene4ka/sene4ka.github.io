import React from 'react'

export default function AppShell({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-bg text-text flex flex-col">
            <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 overflow-y-auto">
                {children}
            </div>
        </div>
    )
}