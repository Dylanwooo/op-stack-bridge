import { Typography, Stack, Link } from "@mui/material";

export default function Header() {
  return (
    <Stack direction="row" spacing={12} p="16px">
      <Link href="/">HOME</Link>
      <Link href="/swap">TRADE</Link>
      <Link href="/bridge">BRIDGE</Link>
      <Link href="/liqulity">LIQUILITY</Link>
    </Stack>
  );
}
