import HomeSocialMediaIcon from "@/components/icons/home-social-media-icon";

function ContactCard() {
  return (
    <div className="border-border flex flex-col rounded-md border">
      <div className="flex grow flex-col justify-between p-4">
        <div>
          <h2 className="font-bold">Restez informé</h2>
          <p className="text-muted-foreground text-sm">
            Retrouvez-nous sur les réseaux sociaux ou contactez-nous par e-mail.
          </p>
        </div>
        <div className="mt-4 flex flex-row items-center gap-3">
          <HomeSocialMediaIcon type="instagram" />
          <HomeSocialMediaIcon type="linkedin" />
          <HomeSocialMediaIcon type="email" />
        </div>
      </div>
    </div>
  );
}

export default ContactCard;
