interface ErrorTextProps {
    children: string;
  }
  
  export default function ErrorText({ children }: ErrorTextProps) {
    return <span className="text-red-500 text-sm">{children}</span>;
  }
  