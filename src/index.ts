import app from "./app";
import { zonesService } from "./services";

const PORT = 8080

zonesService.init()

app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`))