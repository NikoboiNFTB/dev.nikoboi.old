for d in */; do
  [ -d "$d/.git" ] && git -C "$d" pull &
done
wait

