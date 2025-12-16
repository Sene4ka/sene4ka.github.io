interface ErrorStateProps {
    message?: string;
}

export function ErrorState({ message = 'Something went wrong' }: ErrorStateProps) {
    return (
        <div className="text-center p-8 text-red-500">
            {message}
        </div>
    );
}