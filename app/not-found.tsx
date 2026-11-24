import { Shell } from "@/components/ui/Shell";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Shell title="This page took an unexpected turn" lead="Even entrepreneurs make lemonade from surprises. Let's get you back on track.">
      <div className="card narrow center"><Button href="/">Back to GCE Batch 10</Button></div>
    </Shell>
  );
}
