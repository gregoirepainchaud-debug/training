#!/bin/bash
# Rend les annonces du prototype à partir du lexique MP3 de l'app.
# Usage : rendre-annonces.sh <dossier-lexique> <dossier-sortie>
# Chaque annonce = cloche (sauf mention) + mots assemblés, sortie WAV PCM (son de notification iOS, < 30 s).
set -e
LEX="$1"; OUT="$2"; mkdir -p "$OUT" /tmp/annonces-segments
render() {
  local name="$1"; shift
  local list=/tmp/annonces-segments/$name.txt; : > "$list"
  local i=0
  for f in "$@"; do
    i=$((i+1))
    ffmpeg -y -loglevel error -i "$f" -af "aresample=44100,apad=pad_dur=0.09" -t 3 -ac 1 -ar 44100 /tmp/annonces-segments/${name}_$i.wav
    echo "file '/tmp/annonces-segments/${name}_$i.wav'" >> "$list"
  done
  ffmpeg -y -loglevel error -f concat -safe 0 -i "$list" -ac 1 -ar 44100 "$OUT/$name.wav"
}
BELL=/tmp/annonces-segments/cloche.wav
ffmpeg -y -loglevel error -i "$(dirname "$LEX")/../cloche.wav" -ac 1 -ar 44100 "$BELL" 2>/dev/null || ffmpeg -y -loglevel error -i "$LEX/../../cloche.wav" -ac 1 -ar 44100 "$BELL"
render annonce-depart    "$BELL" "$LEX/echauffement.mp3" "$LEX/marche.mp3" "$LEX/30.mp3" "$LEX/secondes.mp3"
render annonce-course-1  "$BELL" "$LEX/course.mp3" "$LEX/cycle.mp3" "$LEX/1.mp3" "$LEX/de.mp3" "$LEX/3.mp3"
render annonce-marche-1  "$BELL" "$LEX/marche.mp3" "$LEX/cycle.mp3" "$LEX/1.mp3" "$LEX/de.mp3" "$LEX/3.mp3"
render annonce-course-2  "$BELL" "$LEX/course.mp3" "$LEX/cycle.mp3" "$LEX/2.mp3" "$LEX/de.mp3" "$LEX/3.mp3"
render annonce-marche-2  "$BELL" "$LEX/marche.mp3" "$LEX/cycle.mp3" "$LEX/2.mp3" "$LEX/de.mp3" "$LEX/3.mp3"
render annonce-course-3  "$BELL" "$LEX/course.mp3" "$LEX/cycle.mp3" "$LEX/3.mp3" "$LEX/de.mp3" "$LEX/3.mp3"
render annonce-marche-3  "$BELL" "$LEX/marche.mp3" "$LEX/cycle.mp3" "$LEX/3.mp3" "$LEX/de.mp3" "$LEX/3.mp3"
render annonce-calme     "$BELL" "$LEX/retour.mp3" "$LEX/au.mp3" "$LEX/calme.mp3"
render annonce-fin       "$BELL" "$LEX/entrainement.mp3" "$LEX/terminé.mp3" "$LEX/bravo.mp3"
ls -la "$OUT"
