import { ReadIn } from "@/components/widgets/ReadIn";

export function About() {
  return (
    <div className="framer-4jh0vo" data-framer-name="§ About @0.05">
      <div className="framer-1yudcw6" data-framer-name="Inner">
        <div
          className="framer-1l75v8y-container"
          data-code-component-plugin-id="api"
          data-framer-name="Read-in"
        >
          <ReadIn
            label="Why evening"
            before="We keep small teams, long evenings and"
            phrase="one honest grade"
            note="Every project gets a founder in the room, from first call to launch."
            pill1="/assets/ZjRGChNFFmjzH13y0JFehJELyA.webp"
            pill1After={1}
            pill2="/assets/hW2hwZLEyAP5TcAH6kIPTzosoo.webp"
            pill2After={4}
            accent="rgb(240, 138, 93)"
          />
        </div>
      </div>
    </div>
  );
}
