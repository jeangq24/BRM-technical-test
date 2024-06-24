import Container from "@/components/Container";

export default function Home() {

  return (
    <Container>
      <div className="flex flex-col items-center justify-center min-h-[100dvh] gap-6 px-4 md:px-6">
      <div className="bg-muted rounded-full flex items-center justify-center aspect-square w-20 md:w-24 lg:w-28">
        <WrenchIcon className="w-10 h-10 text-muted-foreground" />
      </div>
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Site Under Construction</h1>
        <p className="text-muted-foreground md:text-lg">
          We're working hard to bring you something amazing. Please check back soon!
        </p>
      </div>
    </div>

    </Container>
  )
};

function WrenchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  )
}
