import { System } from "./bootstrap/alcata";
import { Alpine } from "./alpine";
import app from "./stores/app";

Alpine.store('app', app);

System.boot();