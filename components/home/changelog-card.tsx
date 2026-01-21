function ChangelogCard() {
  return (
    <div className="border-muted-foreground/20 bg-muted-foreground/5 relative mt-4 flex w-full flex-row items-center gap-4 rounded-md border p-4 text-xs">
      <div className="flex flex-col gap-1">
        <h1 className="text-sm font-semibold">
          Nouveaux partis et sauvegarde des conversations 🚀🎉
        </h1>
        <p className="text-muted-foreground">
          Vous pouvez maintenant vous connecter pour sauvegarder vos
          conversations. De plus, vous pouvez désormais discuter avec de
          nouveaux partis.
        </p>
      </div>
    </div>
  );
}

export default ChangelogCard;
